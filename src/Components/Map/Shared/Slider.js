import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}`;
}

/**
 * this function displays the radius slider for the hospital search
 * and allows to change the radius
 */
function DiscreteSlider(props) {

  const [radius, setRadius] = useState(15);

  return (
    <div style={{ width: '90vw', marginLeft: '5vw', marginTop: '3vh' }}>
      <Typography id="discrete-slider" gutterBottom>
        {`Rayon de la recherche: ${radius} km`}
      </Typography>
      <Slider
        defaultValue={15}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        marks
        onChange={(e, val) => {setRadius(val); props.setRadius(val)}}
        min={10}
        max={50}
      />
    </div>
  );
}

export default DiscreteSlider;
