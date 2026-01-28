#!/bin/bash

# Login Docker using environment variable
echo $PASSWORD_DOCKER_HUB | docker login -u khaerulilman --password-stdin

# Build image
docker build -t khaerulilman/karsajobs-ui:latest .

# Push image
docker push khaerulilman/karsajobs-ui:latest
