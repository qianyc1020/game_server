REM 编译proto文件到服务端的/dist/apps/protocol/文件夹下
REM pbjs -t static-module -w commonjs -o ../src/apps/protocol/protobufMsg.js protobufMsg.proto
REM pbjs -t static-module -w commonjs -o protobufMsg.js protobufMsg.proto
pbjs -t static-module -w commonjs -o ../dist/apps/protocol/protobufMsg.js protobufMsg.proto
pause