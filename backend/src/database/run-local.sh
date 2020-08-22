#!/bin/bash
# Use this to start mongo locally
docker build --tag vontheserp/mongo-db .
docker run --publish 8081:27017 --detach vontheserp/mongo-db