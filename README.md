# Folsom Maps

## Introduction
This repository houses the code for the [folsommaps.com](https://folsommaps.com). The website helps visualize geographic features of Folsom, CA. It's undergoing rapid development so many aspects may change in the coming days, weeks, and months. If you just want to see the results, you can visit [folsommaps.com](https://folsommaps.com). The experience will be best on a desktop browser, but the mobile version is functional as well.

## Geojson
The files located under the `geojson/` folder are free to use. To be clear though, *these files are not directly from the City of Folsom*. These maps were based on documents from Folsom's official website, but they were created via [geojson.com](https://geojson.com) to be as faithful as possible to the original documents. In the future, this repository will have tools to turn images of maps directly into latitude and longitude coordinates via machine learning and computer vision. For now, assume any `.geojson` files are hand-crafted approximations of official documents. If anyone from the City of Folsom would like to share existing mapping files, please send an email to darveshgorhe@gmail.com.

## Contributing
If you would like to contribute, please get in touch at darveshgorhe@gmail.com, but for now there isn't enough structure to divide tasks efficiently. However, for the sake of transparency the plans right now are:

1. Create additional `geojson` files for election districts and zoning areas.
2. Add overlay to map to toggle between different (only city border, election districts, and zoning areas).
3. Add hover/tap based box overlays for election districts and zoning areas. 
4. Incorporate Google Analytics to track site visits (but avoid any personally identifiable information).
5. Make mobile and web experience consistent (viewport does not extend to edges of some mobile displays).
6. Find or create dataset for image --> latitude, longitude mapping task.
7. Fine-tune a YOLO image segmentation model to perform image --> latitude, longitude mapping task.
8. Create a model for image --> latitude, longitude mapping task from scratch. 
9. Learn more about React
10. Design a logo.

If you feel like you can help with any of these things and have concrete ideas, please reach out. Otherwise, please hold on while this project scales and becomes more organized.

## References & Resources
https://mygeodata.cloud/
- Source of the `geojson/folsom-border.geojson` file