import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3, Group } from 'three';
import { Text } from '@react-three/drei';

export const Hand = () => {
  const handRef = useRef<Group>(null);
  const [isFiring, setIsFiring] = useState(false);
  const { camera } = useThree();

  useFrame((state) => {
    if (!handRef.current) return;
    
    // Position hand relative to camera
    const targetPos = new Vector3(0.5, -0.4, -0.6);
    targetPos.applyQuaternion(camera.quaternion);
    targetPos.add(camera.position);
    
    handRef.current.position.copy(targetPos);
    handRef.current.quaternion.copy(camera.quaternion);
    
    // Sway animation
    const time = state.clock.getElapsedTime();
    handRef.current.position.y += Math.sin(time * 4) * 0.01;

    // Firing animation recoil
    if (isFiring) {
      handRef.current.position.z += 0.05;
    }
  });

  const handleFire = () => {
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 50);
  };

  return (
    <group ref={handRef} onPointerDown={handleFire}>
      {/* Sleeve */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.4]} />
        <meshStandardMaterial color="#5d4037" /> {/* Brown uniform sleeve */}
      </mesh>
      {/* Red Band */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.16, 0.16, 0.1]} />
        <meshStandardMaterial color="#b71c1c" />
      </mesh>
      {/* Hand */}
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      {/* Rifle */}
      <group position={[0.1, -0.1, -0.5]}>
        {/* Stock */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.05, 0.1, 0.3]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.05, -0.1]}>
          <boxGeometry args={[0.06, 0.08, 0.6]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
        {/* Barrel */}
        <mesh position={[0, 0.06, -0.5]}>
          <boxGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        {isFiring && (
          <group position={[0, 0.2, -0.75]}>
            <mesh position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              BANG!
            </Text>
          </group>
        )}
      </group>
    </group>
  );
};
