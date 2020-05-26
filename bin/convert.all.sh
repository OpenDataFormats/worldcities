#!/bin/bash
source $(dirname ${0})/base.sh

info "Running the TSV to JSON converters on all datasets"

info "Converting country data"
node ${CONVERTERS_DIR}/countries.js

info "Converting city data"
node ${CONVERTERS_DIR}/cities.js

info "Converting GeoJSON data"
node ${CONVERTERS_DIR}/shapes.js
