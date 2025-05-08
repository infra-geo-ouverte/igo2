#!/bin/bash

# Perform the copy
cp "igo2-geo.mjs" "../node_modules/@igo2/geo/fesm2022/"

# Confirm success
if [ $? -eq 0 ]; then
  echo "igo2-geo.mjs copied successfully to ../node_modules/@igo2/geo/fesm2022/"
else
  echo "Failed to copy the igo2-geo.mjs"
  exit 1
fi

# Perform the copy
cp "overlay-marker-style.utils.mjs" "../node_modules/@igo2/geo/esm2022/lib/style/shared/overlay/"

# Confirm success
if [ $? -eq 0 ]; then
  echo "overlay-marker-style.utils.mjs copied successfully to ../node_modules/@igo2/geo/esm2022/lib/style/shared/overlay/"
else
  echo "Failed to copy the overlay-marker-style.utils.mjs"
  exit 1
fi
