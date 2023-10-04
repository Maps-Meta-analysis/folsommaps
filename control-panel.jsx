import * as React from 'react';
import {useState} from 'react';
import * as style from './style';
// import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  'BEIGE': '#CBB59D',
  'BLUE': '#3E7EAE',
  'SKY BLUE': '#4EADC9',
  'GREEN': '#216331',
  'Yellow': '#FBCE80',
};

function ControlPanel({activeButtons, handleButtonChanged}) {
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className="control-panel" style={{background: 'transparent', padding: '10px', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <button onClick={togglePanel} className="control-panel-button" style={{height: '40px', backgroundColor: COLORS['BLUE'], borderRadius: '20px', padding: '10px 20px', color: 'white', fontWeight: 'bold', fontSize: '16px'}}>
        <span style={{marginRight: '5px'}}>{showPanel ? '▼' : '►'}</span>
        Overlays
      </button>

      {showPanel && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <button
            id="overlay1"
            name="Voting Districts"
            onClick={(event) => handleButtonChanged(event)}
            style={{
              ...style.buttonStyle,
              backgroundColor: COLORS['GREEN'],
              opacity: activeButtons['Voting Districts'] ? 1 : 0.5,
            }}
          >
            <span style={{...style.overlayLabelStyling, color: 'black', cursor: 'pointer'}}>Voting Districts</span>
          </button>

          <button
            id="overlay2"
            name="FCUSD Boundaries"
            onClick={(event) => handleButtonChanged(event)}
            style={{
              ...style.buttonStyle,
              backgroundColor: COLORS['GREEN'],
              opacity: activeButtons['FCUSD Boundaries'] ? 1 : 0.5,
            }}
          >
            <span style={{...style.overlayLabelStyling, color: 'black', cursor: 'pointer'}}>FCUSD Boundaries</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);
