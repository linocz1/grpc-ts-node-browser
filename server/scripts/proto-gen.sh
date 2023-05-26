#!/bin/bash

CURRENT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROTO_DIR=$CURRENT_DIR/../../shared/proto
OUT_DIR=$CURRENT_DIR/../proto

# Generate JavaScript code
yarn run grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${OUT_DIR} \
  --grpc_out=${OUT_DIR} \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto

# # Generate TypeScript code (d.ts)
yarn run grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${OUT_DIR} \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto
