import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useStore } from '../hooks/useStore';

export const Enemy = ({ position }) => {
  const [isDead, setIsDead] = useState(false);
  const incrementKills = useStore((state: any) => state.incrementKills);
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position,
  }));

  const velocity = useRef([0, 0, 0]);
  const pos = useRef([0, 0, 0]);

  useFrame((state) => {
    if (isDead) return;
    // Simple AI: Wander or move towards player
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time * 0.5) * 2;
    const z = Math.cos(time * 0.5) * 2;
    
    api.velocity.set(x, velocity.current[1], z);
  });

  if (isDead) return null;

  return (
    <group 
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setIsDead(true);
        incrementKills();
      }}
    >
      {/* Blocky Soldier Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#4b5320" /> {/* Olive Drab */}
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.45, 0.1, 0.45]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
    </group>
  );
};
