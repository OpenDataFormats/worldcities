#!/bin/sh

BIN_DIR="$(dirname ${0})"
ROOT_DIR="${BIN_DIR}/.."

# Folder with parsing and converting scripts
CONVERTERS_DIR="${ROOT_DIR}/converters"

# Folder to write dataset sources to
DATA_SRC_DIR="${ROOT_DIR}/data"


info() {
  echo "WorldCities :: ${1}"
}
