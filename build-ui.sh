#!/bin/sh
rm -rf ./src/Server/Hosting.UI/UI/
yarn --cwd ./src/UI
yarn --cwd ./src/UI relay
yarn --cwd ./src/UI build
mkdir ./src/Server/Hosting.UI/UI
cp -R ./src/UI/build/* ./src/Server/Hosting.UI/UI
touch ./src/Server/Hosting.UI/UI/.keep
