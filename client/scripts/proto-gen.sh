#!/bin/bash

CURRENT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROTO_DIR=$CURRENT_DIR/../../shared/proto
OUT_DIR=$CURRENT_DIR/../proto

yarn run grpc_tools_node_protoc \
  -I $PROTO_DIR \
  --ts_opt optimize_code_size \
  --ts_out $OUT_DIR \
  $PROTO_DIR/*.proto
