import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Button } from '@material-ui/core';
import mapboxgl from 'mapbox-gl';
import '../../../node_modules/mapbox-gl/dist/mapbox-gl';
import style from './style.json';
import './Map.css';
import hmDummyData from './hmDummyData.json';

const useStyles = makeStyles({
  map: {
    position: 'relative',
    height: '640px',
    display: 'flex',
    marginLeft: '15%',
    flex: 1,
  },
  mapCanvas: {
    margin: 'auto',
  },
});

const FunctionalMap = props => {
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapContainer, setMapContainer] = useState('');

  if (mapContainer === '') {
    setMapContainer(props.title.replace(/ /g, ''));
  }

  const addHeatmapLayer = map => {
    map.addSource('corpsProjectsHeatMap', {
      type: 'geojson',
      data: hmDummyData,
    });

    map.addLayer({
      id: 'corpsProjects',
      type: 'heatmap',
      source: 'corpsProjectsHeatMap',
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'value'],
          0,
          0,
          6,
          1,
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)',
        ],

        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 10],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
      },
    });
  };

  useEffect(() => {
    const buildMap = () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

      const localMap = new mapboxgl.Map({
        container: mapContainer,
        style: style,
        center: [-89.6, 44.6],
        zoom: 6,
        minZoom: 3,
        maxZoom: 12,
        preserveDrawingBuffer: true,
        touchZoomRotate: true,
      });
      setMap(localMap);

      localMap.on('load', () => {
        setMap(localMap);
        setMapLoaded(true);
      });
    };

    buildMap();
  }, [mapContainer, setMapContainer]);

  useEffect(() => {
    if (map && showHeatmap) {
      if (mapLoaded) {
        addHeatmapLayer(map);
      } else {
        map.on('load', () => {
          addHeatmapLayer(map);
        });
      }
    } else if (map && !showHeatmap && mapLoaded) {
      if (map.getLayer('corpsProjects')) {
        map.removeLayer('corpsProjects');
      }
      if (map.getSource('corpsProjectsHeatMap')) {
        map.removeSource('corpsProjectsHeatMap');
      }
    }
  });

  return (
    <div className="map">
      {/* <h3>Map of All the Things</h3> */}
      <h3>{props.title}</h3>
      <Grid container className={classes.mapCanvas}>
        <Grid item className={classes.map}>
          <div
            id={mapContainer}
            style={{
              position: 'absolute',
              display: 'flex',
              top: 0,
              bottom: 0,
              width: '80%',
              flex: 1,
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Button
          style={{ margin: 'auto' }}
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          Army Corps of Eng. Projects
        </Button>
      </Grid>
    </div>
  );
};

Map.propTypes = {
  title: PropTypes.string,
};

export default FunctionalMap;
