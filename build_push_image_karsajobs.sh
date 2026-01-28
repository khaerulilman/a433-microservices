#!/bin/bash

# Login Docker using environment variable
echo $PASSWORD_DOCKER_HUB | docker login -u khaerulilman --password-stdin

# Build image
docker build -t khaerulilman/karsajobs:latest .

# Push image
docker push khaerulilman/karsajobs:latest
