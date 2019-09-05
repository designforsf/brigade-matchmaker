#!/usr/bin/env bash
# Generate HTTPS certificates.
openssl req -x509 \
  -out ./localhost_keys/localhost.crt -keyout ./localhost_keys/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
  printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

# Generate DH params.
openssl dhparam -out ./dhparam/dhparam-2048.pem 2048
