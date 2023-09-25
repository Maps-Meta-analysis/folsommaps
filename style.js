export const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '2px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: '1.5',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease',
    padding: '5px',
    marginVertical: '15px'
};

export const overlayLabelStyling = {
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase'
};

export const borderLayerStyle = {
    id: 'border',
    type: 'line',
    paint: {
        'line-width': 2,
        'line-color': '#007cbf'
    }
};

export const votingDistrictsLayerStyle = {
    id: 'voting-districts',
    type: 'fill',
    paint: {
        'fill-color': '#007cbf',
        'fill-opacity': 0.5
    }
};

export const fcusdBoundariesLayerStyle = {
    id: 'fcusd-boundaries',
    type: 'fill',
    paint: {
        'fill-color': '#007cbf',
        'fill-opacity': 0.5
    }
};