import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Text from './Text'
import Effects from './Effects'
import Sparks from './Sparks'
import Particles from './Particles'
import './styles.css'

function Ellipse(props) {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 10, 3, 0, 2 * Math.PI, false, 0)
    const points = curve.getPoints(50)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])
  return (
    <line geometry={geometry} {...props}>
      <meshBasicMaterial />
    </line>
  )
}

function ReactAtom(props) {
  return (
    <group {...props}>
      <Ellipse />
      <Ellipse rotation={[0, 0, Math.PI / 3]} />
      <Ellipse rotation={[0, 0, -Math.PI / 3]} />
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  )
}

function Number({ days, hours, minutes }) {
  const ref = useRef()
  const stringTimer = `${days}:${hours}:${minutes}`
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 2, 0.1)
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.mouse.y / 2, 0.1)
      ref.current.rotation.y = 0.8
    }
  })
  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Text
          size={10}
          height={12}
        >
          {stringTimer}
        </Text>
        <Text position={[0, -10, 0]} size={5} height={5}>MLW.WORLD</Text>
      </group>
    </Suspense>
  )
}

function App() {
  const mouse = useRef([0, 0])
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const deadline = "September, 15, 2023";
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Canvas
      linear
      dpr={[1, 2]}
      camera={{ fov: 110, position: [8, 0, 30] }}
      onCreated={({ gl }) => {
        // gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.setClearColor(new THREE.Color('#050505'))
      }}>
      <fog attach="fog" args={['white', 40, 100]} />
      <pointLight distance={80} intensity={2} color="white" />
      <Number mouse={mouse}
        days={days < 10 ? "0" + days.toString() : days.toString()}
        hours={hours < 10 ? "0" + hours.toString() : hours.toString()}
        minutes={minutes < 10 ? "0" + minutes.toString() : minutes.toString()}
      />
      <Particles count={isMobile ? 5000 : 10000} mouse={mouse} />
      <Sparks count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} />
      <Effects />
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
