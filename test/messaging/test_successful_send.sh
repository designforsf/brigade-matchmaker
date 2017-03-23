#!/usr/bin/env bash

echo "Test the email sender API"
EPOCH=`date +%s`
echo "TestID=$EPOCH"

# move to the directory of the script
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR

URL="http://localhost:5475/api/send"
echo "Calling $URL"
POSTDATA='{"email":{"to":[{"name":"James Pitts","email":"james.pitts@gmail.com"}],"from":[{"name":"Hello Volunteery","email":"welcome.sfbrigade+'$EPOCH'@gmail.com"}], "subject": "RE: World", "text":"Hello, World!"}}'
wget -vO- --post-data="$POSTDATA" --header='Accept-Charset: UTF-8' --header='Content-Type: application/json' $URL

sleep 1

echo
echo "Done!"
