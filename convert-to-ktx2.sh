#!/bin/bash

set -e

# Option templates for map types
SRGB_OPTS="--encode uastc --assign_oetf srgb --genmipmap"
LINEAR_OPTS="--encode uastc --assign_oetf linear --genmipmap"

# Loop over all input images in public/r3f/
find public/r3f -type f \( -iname '*.png' -o -iname '*.jpg' \) | while read orig; do
  rel_path="${orig#public/r3f/}"
  out_path="public/r3f-ktx2/${rel_path%.*}.ktx2"
  out_dir=$(dirname "$out_path")
  mkdir -p "$out_dir"

  # Heuristically determine map type by filename
  if [[ "$rel_path" =~ (albedo|basecolor|diffuse) ]]; then
    opts="$SRGB_OPTS"
  else
    opts="$LINEAR_OPTS"
  fi

  echo "Encoding $orig -> $out_path"
  toktx $opts "$out_path" "$orig"
done

echo "✅ All textures processed."
