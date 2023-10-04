import PropTypes from 'prop-types';

export const GeoComponentProps = {
    name: PropTypes.string.isRequired,
};

export const MapComponentProps = {
    'activeOverlays.Folsom Border': PropTypes.string.isRequired,
    'activeOverlays.Voting Districts': PropTypes.string.isRequired,
    'activeOverlays.FCUSD Boundaries': PropTypes.string.isRequired
};

export const RootProps = {
    'activeOverlays.Folsom Border': PropTypes.string.isRequired,
    'activeOverlays.Voting Districts': PropTypes.string.isRequired,
    'activeOverlays.FCUSD Boundaries': PropTypes.string.isRequired
};