# Build image
docker build -t khaerulilman/order-service:latest .

# docker login
docker login

# Push ke Docker Hub
docker push khaerulilman/order-service:latest
