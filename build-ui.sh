#!/bin/sh
rm -rf ./src/Server/Authoring.UI/UI/
yarn --cwd ./src/UI
yarn --cwd ./src/UI build
cp -R ./src/UI/build/* ./src/Server/Authoring.UI/UI
touch ./src/Server/Authoring.UI/UI/.keep