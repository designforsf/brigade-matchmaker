#!/usr/bin/env bash

echo "Test basic matching"

BASEURL="http://localhost:5455/api/user/matches"

echo
SKILLS="javascript,ruby", GOALS="", INTERESTS=""
URL="$BASEURL?skills=$SKILLS&goals=$GOALS&interests=$INTERESTS"
echo "Calling WITH skills=$SKILLS goals=$GOALS interests=$INTERESTS"
wget -qO- $URL | python -m json.tool
echo "INPUT was: skills=$SKILLS goals=$GOALS interests=$INTERESTS"

echo
SKILLS="javascript", GOALS="learn", INTERESTS=""
URL="$BASEURL?skills=$SKILLS&goals=$GOALS&interests=$INTERESTS"
echo "Calling WITH skills=$SKILLS goals=$GOALS interests=$INTERESTS"
wget -qO- $URL | python -m json.tool
echo "INPUT was: skills=$SKILLS goals=$GOALS interests=$INTERESTS"

echo
SKILLS="", GOALS="", INTERESTS="homelessness,housing"
URL="$BASEURL?skills=$SKILLS&goals=$GOALS&interests=$INTERESTS"
echo "Calling WITH skills=$SKILLS goals=$GOALS interests=$INTERESTS"
wget -qO- $URL | python -m json.tool
echo "INPUT was: skills=$SKILLS goals=$GOALS interests=$INTERESTS"

echo
echo "Done!"
