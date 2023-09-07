#!/bin/bash

# Initialize an empty array
file_array=()

# Use 'find' to list all image files (including subdirectories)
while IFS= read -r -d '' file; do
  # Extract the current directory name
  current_dir_name=$(basename "$(pwd)")
  
  # Remove leading './' from the file path
  file="${file#./}"
  # Enclose the file path in double quotes and add it to the array with the prefix
  file_array+=("\"$current_dir_name/$file\"")
done < <(find . -type f \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png -o -iname \*.gif \) -print0)

# Join the elements of the array with commas and print the result
result=$(IFS=,; echo "${file_array[*]}")
echo "File array: [$result]"
