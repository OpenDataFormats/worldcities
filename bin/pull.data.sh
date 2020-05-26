#!/bin/bash
source $(dirname ${0})/base.sh

GEONAMES_DUMP_URL="https://download.geonames.org/export/dump"

info "Pulling the most recent datasets"

info "Pulling the city and country datasets"
curl ${GEONAMES_DUMP_URL}/countryInfo.txt \
  --output ${DATA_SRC_DIR}/countryInfo.txt

info "Pulling the GeoJSON shapes datasets"
curl ${GEONAMES_DUMP_URL}/shapes_all_low.zip | tar -xz --directory ${DATA_SRC_DIR}
