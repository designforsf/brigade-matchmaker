#!/usr/bin/env bash

echo "Test the create user and session"

# get the test id, used to login with the correct email and password
sleep 1
read -r -p "ENTER the TestID: " EPOCH

echo "Using cookies-$EPOCH.txt"

# move to the directory of the script
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR

URL="http://localhost:5455/api/user/login"
echo "Calling $URL"
wget -qO- \
--save-cookies cookies-$EPOCH-successful-login.txt \
--keep-session-cookies \
--post-data "email=designforsf#$EPOCH@gmail.com&password=$EPOCH" \
$URL

echo

URL="http://localhost:5455/api/user/session"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
$URL

echo
echo "Done!"
