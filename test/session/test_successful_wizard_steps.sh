#!/usr/bin/env bash

echo "Test the create user and session"

# get the test id, used to login with the correct email and password
sleep 1
read -r -p "ENTER the TestID: " EPOCH

echo "Using cookies-$EPOCH.txt"

# move to the directory of the script
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR

URL="http://localhost:5455/api/user/session"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
$URL
echo

sleep 1

# test the login step (actually won't do that due to redirects)

echo "Test Step 0"

URL="http://localhost:5455/api/user/match_config"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
--post-data "step=0&interests=&skills=&roles=" \
$URL
echo

sleep 2

# test the interests step

INTERESTS="homelessness,urbanplanning"
echo "Test Step 1 with INTERESTS=$INTERESTS"

URL="http://localhost:5455/api/user/match_config"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
--post-data "step=1&interests=$INTERESTS&skills=&roles=" \
$URL
echo

sleep 2


# test the skills step

SKILLS="javascript,python"
echo "Test Step 2 with SKILLS=$SKILLS"

URL="http://localhost:5455/api/user/match_config"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
--post-data "step=2&interests=$INTERESTS&skills=$SKILLS&roles=" \
$URL
echo

sleep 2


# test the roles step

ROLES="learn"
echo "Test Step 3 with ROLES=$ROLES"

URL="http://localhost:5455/api/user/match_config"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
--post-data "step=3&interests=$INTERESTS&skills=$SKILLS&roles=$ROLES" \
$URL
echo

sleep 2


# test the algo step

ROLES="javascript,python"
echo "Test Step 4 (algorithm activate)"

URL="http://localhost:5455/api/user/match_config"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH-successful-login.txt \
--post-data "step=4&interests=$INTERESTS&skills=$SKILLS&roles=$ROLES" \
$URL
echo

sleep 2





echo
echo "Done!"
