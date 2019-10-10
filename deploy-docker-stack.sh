#!/bin/bash
echo "Usage:"
echo "Deploy locally (use self-signed, pregenerated SSL certs):"
echo "  ./deploy-docker-stack.sh"
echo "Deploy in production (use certbot to obtain SSL certs):"
echo "  ./deploy-docker-stack.sh ./docker-compose.yml ./docker-compose.prod.yml"

handle_error () {
    errcode=$? # save the exit code of the failed command
    echo "error $errcode during $BASH_COMMAND"
    echo "on line ${BASH_LINENO[0]}"
    echo "Probably just run this script again."
    exit $errcode
}
trap handle_error ERR

assert_output_contains () {
  cmd=$1
  expected=$2

  # Run the command.
  actual=$(eval ${cmd}) || true

  # Output.
  if (echo "$actual" | grep -q "$expected"); then
    echo "PASSED"
    return 0
  else
    echo "expected \"$expected\", got \"$actual\";" "$1"
    echo "FAIL"
    return 1
  fi
}

HTTP_HOSTPORT=localhost:80
SSL_HOSTPORT=localhost:443

# Bring down the existing stack.
docker-compose stop
docker-compose down
yes | docker-compose rm

# Bring up the new stack.
COMPOSE_FILES=""
if [ $# -gt 0 ]; then
  while [ "$1" != "" ]; do
    COMPOSE_FILES="$COMPOSE_FILES -f $1"
    shift
  done
fi
docker-compose $COMPOSE_FILES up -d --remove-orphans

# Attempt to curl for $max_time seconds.
echo "Waiting for connection from $HTTP_HOSTPORT..."
time_waited=0
max_time=120 # seconds
until $(curl --output /dev/null --silent --head --fail http://$HTTP_HOSTPORT); do
    printf '.'
    sleep 1
    time_waited=$(($time_waited+1))
    if [ ${time_waited} -eq ${max_time} ];then
      echo "Timed out."
      exit 1
    fi
done


# Assert that we get errors that indicate HTTPS is working.
echo "Testing HTTP 301 redirect on ${HTTP_HOSTPORT}..."
assert_output_contains "curl --silent ${HTTP_HOSTPORT} --stderr -" "301 Moved Permanently"
echo "Testing that plain HTTP requests receive 400 error on ${SSL_HOSTPORT}..."
assert_output_contains "curl --silent ${SSL_HOSTPORT} --stderr -" "400 The plain HTTP request was sent to HTTPS port"

echo "Your environment appears to be working."
