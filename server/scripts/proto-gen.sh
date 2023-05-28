#!/bin/bash

CURRENT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROTO_DIR=$CURRENT_DIR/../shared/proto
OUT_DIR=$CURRENT_DIR/proto

# Generate JavaScript code
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${OUT_DIR} \
  --grpc_out=${OUT_DIR} \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto


# generate js codes via grpc-tools
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./proto \
  --grpc_out=grpc_js:./proto \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I ./proto \
  ./proto/*.proto


# # Generate TypeScript code (d.ts)
grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${OUT_DIR} \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto


# generate d.ts codes
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:./proto \
  -I ./proto \
  ./proto/*.proto