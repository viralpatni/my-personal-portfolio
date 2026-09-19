'use client';

import { Float, MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function SceneObject() {
  return <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}><Sphere args={[1.55, 64, 64]} scale={[1.15, 1, 1]}><MeshDistortMaterial color="#c9ff5b" roughness={0.25} metalness={0.55} distort={0.35} speed={1.8} /></Sphere></Float>;
}

export default function Scene3D() {
  return <div className="scene-shell" aria-label="Interactive abstract 3D portfolio sculpture" role="img"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 42 }} fallback={<div className="scene-fallback" />}><ambientLight intensity={1.4} /><directionalLight position={[3, 4, 5]} intensity={3} color="#d7e8ff" /><pointLight position={[-3, -2, 2]} intensity={5} color="#a891ff" /><Suspense fallback={null}><SceneObject /></Suspense><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} /></Canvas><span className="scene-label">interactive object / 01</span></div>;
}
