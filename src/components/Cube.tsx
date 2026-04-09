import { useBox } from '@react-three/cannon';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { useShallow } from 'zustand/react/shallow';
import * as textures from '../images/textures';

export const Cube = ({ position, texture }) => {
  const [hover, setHover] = useState<any>(null);
  const [addCube, removeCube] = useStore(
    useShallow((state: any) => [state.addCube, state.removeCube])
  );

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const activeTexture = textures[`${texture}Texture`];

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={() => {
        setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.altKey) {
          if (clickedFace === 0) addCube(x + 1, y, z);
          else if (clickedFace === 1) addCube(x - 1, y, z);
          else if (clickedFace === 2) addCube(x, y + 1, z);
          else if (clickedFace === 3) addCube(x, y - 1, z);
          else if (clickedFace === 4) addCube(x, y, z + 1);
          else if (clickedFace === 5) addCube(x, y, z - 1);
          return;
        }
        removeCube(x, y, z);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial
        color={hover !== null ? 'gray' : 'white'}
        map={activeTexture}
        transparent={texture === 'glass'}
        opacity={texture === 'glass' ? 0.6 : 1}
      />
    </mesh>
  );
};
