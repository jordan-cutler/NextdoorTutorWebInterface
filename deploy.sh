#!/usr/bin/env bash

TARGETFOLDER=././../NextdoorTutorServer/public
#TARGETFOLDER=../backend/target/classes

WEBFOLDERNAME=html
# This is the output folder for our compiled app

# step 1: make sure we have someplace to put everything.  We will delete the
#         old folder tree, and then make it from scratch
#rm -rf $TARGETFOLDER/$WEBFOLDERNAME
#mkdir -p $TARGETFOLDER/$WEBFOLDERNAME

# step 2: run the unit tests
#ng test --code-coverage --watch=false

# step 3: build the app with Ahead of Time compilation enabled
ng build --aot --output-path $TARGETFOLDER/$WEBFOLDERNAME --deploy-url=assets/html/

