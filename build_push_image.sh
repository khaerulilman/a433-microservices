#!/bin/bash

docker build -t item-app:v1 .

docker images

docker tag item-app:v1 khaerulilman/item-app:v1

docker login

docker push khaerulilman/item-app:v1
