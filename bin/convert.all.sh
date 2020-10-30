#!/bin/bash
source $(dirname ${0})/base.sh

info "Running the TSV to JSON converters on all datasets"

info "Converting city, country and continent data"
node ${CONVERTERS_DIR}/cities.js
node ${CONVERTERS_DIR}/continents.js
