import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const Dog = ({ position }) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    position,
    args: [0.6, 0.4, 1],
  }));

  const velocity = useRef([0, 0, 0]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time * 0.8) * 1.5;
    api.velocity.set(x, velocity.current[1], 0);
  });

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.4, 0.8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.3, -0.4]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.1, 0.45]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
};
