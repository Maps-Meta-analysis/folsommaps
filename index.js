/* global document */
import * as React from 'react';
import {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Source, Layer} from 'react-map-gl';
import Loader from './loader';
import ControlPanel from './control-panel';
import './index.css';
import * as style from './style';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as props from './propValidations';

const branch = 'toggle-data-elements';
const BASE = `https://us-central1-folsommaps.cloudfunctions.net/`;

const GEOJSON = {
  'Folsom Border': `https://raw.githubusercontent.com/dgorhe/folsommaps/${branch}/geojson/folsom-border.geojson`,
  'Voting Districts': `https://raw.githubusercontent.com/dgorhe/folsommaps/${branch}/geojson/test-voting-districts.geojson`,
  'FCUSD Boundaries': `https://raw.githubusercontent.com/dgorhe/folsommaps/${branch}/geojson/test-fcusd-boundaries.geojson`,
};

GeoComponent.propTypes = props.GeoComponentProps;
MapComponent.propTypes = props.MapComponentProps;
Root.propTypes = props.RootProps;

/**
 * A React component that renders a GeoJSON layer based on the given name.
 * @param {Object} props - The props object.
 * @param {string} props.name - The name of the GeoJSON layer to render.
 * @return {JSX.Element} A JSX element that renders the GeoJSON layer.
 */
function GeoComponent({name}) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (link !== null) {
      fetch(link)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
    }
  }, [link]);

  if (name == 'Folsom Border') {
    return (
      <Source type="geojson" data={data}>
        <Layer {...style.borderLayerStyle} />
      </Source>
    );
  } else if (name == 'Voting Districts') {
    return (
      <Source type="geojson" data={data}>
        <Layer {...style.votingDistrictsLayerStyle} />
      </Source>
    );
  } else if (name == 'FCUSD Boundaries') {
    return (
      <Source type="geojson" data={data}>
        <Layer {...style.fcusdBoundariesLayerStyle} />
      </Source>
    );
  }
}

/**
 * Renders a Map component with GeoComponents based on the active overlays.
 * @param {Object} props - The props object.
 * @param {Object} props.activeOverlays - object with the active overlays.
 * @return {JSX.Element} - A Map component with GeoComponents.
 */
function MapComponent({activeOverlays}) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch(BASE + 'readMapboxToken')
        .then((response) => response.json())
        .then((data) => setToken(data['token']));

    return () => {
      console.log('Unmounting');
    };
  }, [token]);

  if (token) {
    return (
      <Map
        initialViewState={{
          latitude: 38.6780,
          longitude: -121.1581,
          zoom: 11.5,
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        mapboxAccessToken={token}
      >
        <GeoComponent
          name={'Folsom Border'}
          link={activeOverlays['Folsom Border']}
        />

        {
          activeOverlays['Voting Districts'] &&
          <GeoComponent
            name={'Voting Districts'}
            link={activeOverlays['Voting Districts']
            }/>
        }
        {
          activeOverlays['FCUSD Boundaries'] &&
          <GeoComponent
            name={'FCUSD Boundaries'}
            link={activeOverlays['FCUSD Boundaries']
            }/>
        }
      </Map>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader />
      </div>
    );
  }
}

/**
 * Component that renders the map container, control panel and map component.
 * @return {JSX.Element} The map container, control panel and map component.
 */
function Root() {
  const [activeOverlays, setActiveOverlays] = useState({
    'Folsom Border': GEOJSON['Folsom Border'],
    'Voting Districts': null,
    'FCUSD Boundaries': null,
  });

  const [activeButtons, setActiveButtons] = useState({
    'Folsom Border': true,
    'Voting Districts': false,
    'FCUSD Boundaries': false,
  });

  const handleButtonChanged = (event) => {
    const {name} = event.currentTarget;

    // Update activeButtons based on current state
    setActiveButtons((prevActiveButtons) => {
      const newState = {...prevActiveButtons, [name]: !prevActiveButtons[name]};

      // Update activeOverlays based on the new activeButtons state
      setActiveOverlays((prevActiveOverlays) => {
        return {
          ...prevActiveOverlays,
          [name]: newState[name] ? GEOJSON[name] : null,
        };
      });

      return newState;
    });
  };


  return (
    <div className='map-container'>
      <ControlPanel
        activeButtons={activeButtons}
        handleButtonChanged={handleButtonChanged}
      />

      <MapComponent activeOverlays={activeOverlays}/>
    </div>
  );
}

const root = createRoot(
    document.body.appendChild(
        document.createElement('div'),
    ),
);

root.render(<Root/>);
