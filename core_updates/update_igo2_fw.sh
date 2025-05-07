#!/bin/bash

# Perform the copy
cp "igo2-geo.mjs" "../node_modules/@igo2/geo/fesm2022"

# Confirm success
if [ $? -eq 0 ]; then
  echo "igo2-geo.mjs copied successfully to ../node_modules/@igo2/geo/fesm2022"
else
  echo "Failed to copy the igo2-geo.mjs."
  exit 1
fi
