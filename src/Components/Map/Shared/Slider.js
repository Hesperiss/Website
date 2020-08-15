import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}`;
}

/**
 * Cette classe affiche et règle le slider pour la recherche d'hôpitaux aux alentours.
 * Basé sur l'object {@link https://material-ui.com/api/slider/ Slider} de Material UI.
 *
 * @Class
 * @see {@link https://material-ui.com/ Documentation Material UI}
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
