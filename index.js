/* global document */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Source, Layer} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
let link = "https://raw.githubusercontent.com/dgorhe/folsommaps/main/geojson/folsom-border.geojson";

const layerStyle = {
    id: 'border',
    type: 'line',
    paint: {
        'line-width': 5,
        'line-color': '#007cbf'
    }
};

function GeoComponent({link}) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch(link)
            .then(response => response.json())
            .then(data => setData(data));
    }, [link]);
    if (!data) {
        return null;
    }
    return (
        <Source type="geojson" data={data}>
            <Layer {...layerStyle} />
        </Source>
    );
}

function Root() {
    return (
        <Map
        initialViewState={{
            latitude: 38.6780,
            longitude: -121.1581,
            zoom: 11.5
        }}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        >
        <GeoComponent link = {link}/>
        </Map>
    );
}

const root = createRoot(
    document.body.appendChild(
        document.createElement('div')
    )
);
root.render(<Root/>);