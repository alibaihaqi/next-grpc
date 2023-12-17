#!/bin/sh

export CURRENT_ROOT="$(pwd)"
export GRPC_PROTOC_GEN_TS_LOCATION="./node_modules/.bin/protoc-gen-ts"
export GRPC_JS_DESTINATION="./src/grpc"
export GRPC_PROTO_LOCATION="$(dirname $CURRENT_ROOT)/next-web-grpc/proto"

rm -rf $GRPC_JS_DESTINATION
mkdir -p $GRPC_JS_DESTINATION

pnpm grpc_tools_node_protoc \
  -I $GRPC_PROTO_LOCATION \
  --js_out=import_style=commonjs,binary:${GRPC_JS_DESTINATION} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${GRPC_JS_DESTINATION} \
  $(find $GRPC_PROTO_LOCATION -name "*.proto")
