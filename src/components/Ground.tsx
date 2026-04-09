import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/textures';
import { useStore } from '../hooks/useStore';

export const Ground = () => {
  const [ref] = usePlane<any>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addCube = useStore((state: any) => state.addCube);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        addCube(x, y, z);
      }}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={groundTexture} />
    </mesh>
  );
};
