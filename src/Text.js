import { useLoader } from '@react-three/fiber'
import React, { forwardRef, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const Text = forwardRef(({ children, vAlign = 'center', size, height, hAlign = 'center', color = '#000000', ...props }, ref) => {
  const font = useLoader(THREE.FontLoader, '/Roboto.json')
  const config = useMemo(() => ({ font, size, height }), [font])
  const mesh = useRef()
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  }, [children])
  return (
    <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial/>
      </mesh>
    </group>
  )
})

export default Text
