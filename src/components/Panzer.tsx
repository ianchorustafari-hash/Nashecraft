import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const Panzer = ({ position }) => {
  const [ref, api] = useBox(() => ({
    mass: 10,
    type: 'Dynamic',
    position,
    args: [2, 1, 3],
  }));

  const velocity = useRef([0, 0, 0]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time * 0.2) * 1;
    api.velocity.set(x, velocity.current[1], 0);
  });

  return (
    <group ref={ref}>
      {/* Chassis */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.8, 3]} />
        <meshStandardMaterial color="#455a64" />
      </mesh>
      {/* Turret */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {/* Gun */}
      <mesh position={[0, 0.6, -1.2]} castShadow>
        <boxGeometry args={[0.2, 0.2, 1.5]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      {/* Tracks */}
      <mesh position={[1, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.4, 3]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      <mesh position={[-1, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.4, 3]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    </group>
  );
};
