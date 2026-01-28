require("dotenv").config();

const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(bp.json());

const amqp = require("amqplib");
const amqpServer = process.env.AMQP_URL;
var channel, connection;

connectToQueue();

async function connectToQueue() {
  const maxRetries = 10;
  const retryDelay = 3000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(
        `Attempting to connect to RabbitMQ (attempt ${i + 1}/${maxRetries})...`,
      );
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      const queue = "order";
      await channel.assertQueue(queue);
      console.log("Successfully connected to RabbitMQ!");
      return;
    } catch (ex) {
      console.error(`Connection attempt ${i + 1} failed:`, ex.message);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        console.error("Max retries reached. Could not connect to RabbitMQ.");
        process.exit(1);
      }
    }
  }
}

app.post("/order", (req, res) => {
  const { order } = req.body;
  createOrder(order);
  res.send(order);
});

const createOrder = async (order) => {
  const queue = "order";
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
  console.log("Order succesfully created!");
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });
};

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
