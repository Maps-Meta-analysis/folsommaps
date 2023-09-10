/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Source, Layer} from 'react-map-gl';
import Loader from './Loader';
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';

// this is a test comment to check github project stuff
let link = "https://raw.githubusercontent.com/dgorhe/folsommaps/main/geojson/folsom-border.geojson";
let BASE = "https://us-central1-folsommaps.cloudfunctions.net/";

const layerStyle = {
    id: 'border',
    type: 'line',
    paint: {
        'line-width': 2,
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
    
    return (
        <Source type="geojson" data={data}>
            <Layer {...layerStyle} />
        </Source>
    );
}

function MapComponent({link}) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch(BASE + 'readMapboxToken')
            .then(response => response.json())
            .then(data => setToken(data["token"]))

        return () => {
            console.log("Unmounting");
        }
    }, [token]);
    
    if (token) {
        return (
            <Map
                initialViewState={{
                    latitude: 38.6780,
                    longitude: -121.1581,
                    zoom: 11.5
                }}
                style={{width: "100vw", height: "100vh"}}
                mapStyle="mapbox://styles/mapbox/streets-v8"
                mapboxAccessToken={token}
            >
                <GeoComponent link={link} />
            </Map>
        )
    } else {
        return (
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Adjust this value to control the height of the centered content
              }}
            >
              <Loader />
            </div>
        );
    }
}

function Root() {
    return (
        <MapComponent link = {link}></MapComponent>
    );
}

const root = createRoot(
    document.body.appendChild(
        document.createElement('div')
    )
);
root.render(<Root/>);
