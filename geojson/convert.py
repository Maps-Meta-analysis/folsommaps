import json
import argparse

# Create an ArgumentParser object
parser = argparse.ArgumentParser(description='GeoJSON configuration script')

# Add command line arguments
parser.add_argument('--input', help='Path to the input GeoJSON file', required=True)
parser.add_argument('--output', help='Path to the output GeoJSON file', required=True)
parser.add_argument('--feature-id', help='ID of the feature to modify', required=True)

# Parse the command line arguments
args = parser.parse_args()

# Read the input GeoJSON file
with open(args.input, 'r') as f:
    geojson_data = json.load(f)

# Find the desired feature by ID
feature = next((f for f in geojson_data['features'] if f['id'] == args.feature_id), None)

# If the feature is found, modify its geometry
if feature:
    feature['geometry']['type'] = 'LineString'
    feature['geometry']['coordinates'] = feature['geometry']['coordinates'][0]

    # Serialize the modified GeoJSON
    serialized = json.dumps(feature)

    # Write the serialized GeoJSON to the output file
    with open(args.output, 'w') as f:
        f.write(serialized)
    print(f'Successfully modified and saved the feature as "{args.output}"')
else:
    print(f'Feature with ID "{args.feature_id}" not found in the input GeoJSON file.')
