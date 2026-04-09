import { Enemy } from './Enemy';
import { Panzer } from './Panzer';
import { Dog } from './Dog';

export const Enemies = () => {
  const spawnPoints = [
    [10, 2, 10],
    [-10, 2, -10],
    [20, 2, 0],
    [-20, 2, 5],
  ];

  const panzerPoints = [
    [15, 2, -15],
    [-15, 2, 15],
  ];

  const dogPoints = [
    [5, 2, 5],
    [-5, 2, -5],
  ];

  return (
    <>
      {spawnPoints.map((pos, i) => (
        <Enemy key={`enemy-${i}`} position={pos} />
      ))}
      {panzerPoints.map((pos, i) => (
        <Panzer key={`panzer-${i}`} position={pos} />
      ))}
      {dogPoints.map((pos, i) => (
        <Dog key={`dog-${i}`} position={pos} />
      ))}
    </>
  );
};
