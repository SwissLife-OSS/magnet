#!/bin/sh

# Use provided ROOT_DIR or default to current directory
ROOT_DIR="${ROOT_DIR:-./}"

rm -rf $ROOT_DIR/src/Server/Hosting.UI/UI/
yarn --cwd $ROOT_DIR/src/UI
yarn --cwd $ROOT_DIR/src/UI build-prod
mkdir $ROOT_DIR/src/Server/Hosting.UI/UI
cp -R $ROOT_DIR/src/UI/build/* $ROOT_DIR/src/Server/Hosting.UI/UI
touch $ROOT_DIR/src/Server/Hosting.UI/UI/.keep
