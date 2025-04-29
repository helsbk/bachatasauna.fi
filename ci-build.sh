#!/bin/bash

set -o errexit -o pipefail

ZOLA_VERSION=0.20.0
wget --quiet "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
tar xf "zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"

DART_SASS_VERSION=1.86.2
wget --quiet "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
tar xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"

MINIFY_VERSION=2.23.2
wget --quiet "https://github.com/tdewolff/minify/releases/download/v${MINIFY_VERSION}/minify_linux_amd64.tar.gz"
tar xf "minify_linux_amd64.tar.gz"

./dart-sass/sass --quiet --no-source-map -I sass sass/bundle.scss:static/css/bundle.css

./zola build

find ./public -name 'index.html' -mindepth 2 -type f \
  -exec sh \
  -c 'parent="$(dirname "$1")"; mv "$1" "$parent/../$(basename "$parent").html";' \
  find-sh {} \;

find ./public -empty -type d -delete

./minify_linux_amd64/minify -r -i ./public
