#!/usr/bin/env bash
# deploy script for the web front-end

# This file is responsible for preprocessing all TypeScript files, making sure
# all dependencies are up-to-date, and copying all necessary files into the
# web deploy directory.

# This is the resource folder where maven expects to find our files
PUBLICFOLDER=../NextdoorTutorServer/public

JAVASCRIPTSFOLDER=javascripts
HTMLFOLDER=html
IMAGESFOLDER=images
STYLESHEETSFOLDER=stylesheets
FONTSFOLDER=fonts
SWAGGERFOLDER=swagger-ui
# This is the folder that we used with the Spark.staticFileLocation command
WEBFOLDERNAME=Web

# These are all of the singletons in the program
SINGLETONS=(Login Navbar CoursesWithTutors Profile TutorApplication TutorSelection EditCourseModal Calendar)

# step 1: make sure we have someplace to put everything.  We will delete the
#         old folder tree, and then make it from scratch
rm -rf $PUBLICFOLDER
mkdir $PUBLICFOLDER
mkdir $PUBLICFOLDER/$JAVASCRIPTSFOLDER
mkdir $PUBLICFOLDER/$HTMLFOLDER
mkdir $PUBLICFOLDER/$IMAGESFOLDER
mkdir $PUBLICFOLDER/$STYLESHEETSFOLDER

# step 2: update our npm dependencies
npm update

# step 3: copy jQuery, Handlebars, and Bootstrap files
cp node_modules/jquery/dist/jquery.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
cp node_modules/handlebars/dist/handlebars.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
# bootstrap unused at the moment
#cp node_modules/bootstrap/dist/js/bootstrap.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
#cp node_modules/bootstrap/dist/css/bootstrap.min.css $PUBLICFOLDER/$STYLESHEETSFOLDER
cp node_modules/materialize-css/dist/js/materialize.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
cp node_modules/materialize-css/dist/css/materialize.min.css $PUBLICFOLDER/$STYLESHEETSFOLDER
cp -R fonts/ $PUBLICFOLDER/$FONTSFOLDER
cp node_modules/moment/min/moment.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
cp node_modules/fullcalendar/dist/fullcalendar.min.js $PUBLICFOLDER/$JAVASCRIPTSFOLDER
cp node_modules/fullcalendar/dist/fullcalendar.min.css $PUBLICFOLDER/$STYLESHEETSFOLDER
cp node_modules/fullcalendar/dist/fullcalendar.print.min.css $PUBLICFOLDER/$STYLESHEETSFOLDER
cp -R jquery-ui $PUBLICFOLDER
cp -R font-awesome-4.7.0 $PUBLICFOLDER/$STYLESHEETSFOLDER
cp -R swagger-ui $PUBLICFOLDER/$SWAGGERFOLDER

# step 4: compile TypeScript files
#node_modules/typescript/bin/tsc app.ts --strict --outFile $PUBLICFOLDER/$JAVASCRIPTSFOLDER/app.js
tsc -p .
# step 5: copy css files
cp app.css $PUBLICFOLDER/$STYLESHEETSFOLDER/app.css
for s in ${SINGLETONS[@]}
do
    cat css/$s.css >> $PUBLICFOLDER/$STYLESHEETSFOLDER/app.css
done

# step 6: compile handlebars templates to the deploy folder
for s in ${SINGLETONS[@]}
do
    node_modules/handlebars/bin/handlebars hb/$s.hb >> $PUBLICFOLDER/$JAVASCRIPTSFOLDER/templates.js
done

# step 7: copy the main HTML shell
cp index.html $PUBLICFOLDER/$HTMLFOLDER

#step 8: copy images
cp -R images/ $PUBLICFOLDER/$IMAGESFOLDER
