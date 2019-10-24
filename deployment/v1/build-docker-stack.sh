#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR/../../
docker build -t sfbrigade/project-match:app -f ./deployment/v1/Dockerfile .
