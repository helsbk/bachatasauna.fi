#!/bin/bash

set -o errexit -o pipefail

(
  zola serve --open & \
  sass --quiet --no-source-map --watch -I sass sass/bundle.scss:static/css/bundle.css \
)
