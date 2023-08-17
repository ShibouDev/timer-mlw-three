import React, { useEffect, useState } from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';

const Countries = ({size}) => {
  const [geoJson, setGeoJson] = useState(false);

  const getGeoJson = async () => {
    try {
      const response = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson');

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setGeoJson(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeoJson();
  }, []);

  return (
    <group>
      {geoJson
        ? geoJson.features.map((data, index) => {
            const { geometry } = data;
            return (
              <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, size)}>
                <lineBasicMaterial color="#5c5c5c" />
              </lineSegments>
            );
          })
        : null}
    </group>
  );
};

export default Countries;