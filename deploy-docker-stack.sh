#!/bin/bash
handle_error () {
    errcode=$? # save the exit code of the failed command
    echo "error $errcode during $BASH_COMMAND"
    echo "on line ${BASH_LINENO[0]}"
    echo "Probably just run this script again."
    exit $errcode
}
trap handle_error ERR

# Bring down the existing stack.
docker stack down sfbm

# Bring up the new stack.
docker stack deploy sfbm -c docker-compose.yml

# Attempt to curl the main page for $max_time seconds.
HOSTPORT=localhost:8080
echo "Waiting for connection from $HOSTPORT..."
time_waited=0
max_time=120 # seconds
until $(curl --output /dev/null --silent --head --fail http://$HOSTPORT); do
    printf '.'
    sleep 1
    time_waited=$(($time_waited+1))
    if [ ${time_waited} -eq ${max_time} ];then
      echo "Timed out."
      exit 1
    fi
done
