import React from 'react';
import Countries from './countries';
import Graticule from "./graticule";
const GlobeMesh = () => {
    return (
        <mesh>
            {/* <sphereGeometry args={[10, 30, 20]}/> */}
            {/* <meshPhongMaterial color="#191919" transparent={true} opacity={0.8} /> */}
            <Graticule />
            <Countries size={10} />
            <Countries size={50} />
        </mesh>
    );
};

export default GlobeMesh;