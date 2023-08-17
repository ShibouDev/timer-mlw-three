import React from 'react';
import Graticule from './graticule';
import Countries from './countries';
const GlobeMesh = () => {
    return (
        <mesh>
            <sphereGeometry args={[10, 30, 20]} />
            <meshPhongMaterial color="#191919" transparent={true} opacity={0.8} />
            <Graticule />
            <Countries />
        </mesh>
    );
};

export default GlobeMesh;