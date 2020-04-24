#!/bin/bash

set -ex

# Download the dependencies
rm -rf package
npm install uuid 

# Create the zip file
rm -f lambdafunctions.zip
cd package
zip -r ../lambdafunctions.zip .
cd ..

# Add our python files to it!
zip -g lambdafunctions.zip putIP.js

echo "Done! Upload me to your lambda functions."
