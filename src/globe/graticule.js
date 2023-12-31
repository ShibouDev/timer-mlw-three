import React from 'react';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import { geoGraticule10 } from 'd3-geo';

const Graticule = () => {
    return (
        <group>
            <lineSegments geometry={new GeoJsonGeometry(geoGraticule10(), 10)}>
                <lineBasicMaterial color="#3c3c3c" />
            </lineSegments>
        </group>
    );
};

export default Graticule;