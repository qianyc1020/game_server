REM 编译proto文件到客户端的creator_client/assets/scripts/framework/protocol/文件夹下
REM pbjs -t static-module -w commonjs -o ../src/apps/protocol/protobufMsg.js protobufMsg.proto
REM pbjs -t static-module -w commonjs -o protobufMsg.js protobufMsg.proto
REM pbjs -t static-module -w commonjs -o ../dist/apps/protocol/protobufMsg.js protobufMsg.proto
pbjs -t static-module -w commonjs -o ../../creator_client/assets/scripts/framework/protocol/protobufMsg.js protobufMsg.proto
pause