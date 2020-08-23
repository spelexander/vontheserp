#!/bin/bash
# Use this to start mongo locally
docker pull mongo

docker run --name vontheserp-mongo -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=vontheserp \
  -e MONGO_INITDB_ROOT_PASSWORD=0dacee19-4651-40c9-af34-3cca75cd4442 \
  -e MONGO_INITDB_DATABASE=vontheserp \
  mongo
