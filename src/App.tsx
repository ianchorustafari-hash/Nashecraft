/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { useState, useEffect } from 'react';
import { useStore } from './hooks/useStore';
import { useShallow } from 'zustand/react/shallow';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
import { FPV } from './components/FPV';
import { Enemies } from './components/Enemies';
import { Hand } from './components/Hand';
import { HUD } from './components/HUD';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [cubes, generateInitialWorld] = useStore(
    useShallow((state: any) => [state.cubes, state.generateInitialWorld])
  );

  useEffect(() => {
    if (isStarted && cubes.length === 0) {
      generateInitialWorld();
    }
  }, [isStarted, cubes.length, generateInitialWorld]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="vignette" />
      <div className="grain" />
      {!isStarted ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/90 text-white p-8 text-center">
          <h1 className="text-6xl font-bold mb-4 tracking-tighter uppercase italic">Frontline Voxel: WWII</h1>
          <p className="text-zinc-400 max-w-md mb-8">
            Survival in the blocky trenches. Build your bunker, defend your position.
            <br />
            <span className="text-xs mt-2 block opacity-50 italic">Historical Simulation Mode</span>
          </p>
          <button 
            onClick={() => setIsStarted(true)}
            className="px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-bold uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 border-b-4 border-red-900"
          >
            Enter Battlefield
          </button>
          <div className="mt-12 grid grid-cols-2 gap-8 text-left text-sm text-zinc-500">
            <div>
              <p className="font-bold text-zinc-300 uppercase mb-1">Controls</p>
              <p>WASD: Move</p>
              <p>Space: Jump</p>
              <p>Click: Remove Block</p>
              <p>Alt + Click: Place Block</p>
            </div>
            <div>
              <p className="font-bold text-zinc-300 uppercase mb-1">Inventory</p>
              <p>1-5: Select Material</p>
              <p>Esc: Menu</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Canvas shadows camera={{ fov: 45 }}>
            <fog attach="fog" args={['#202020', 10, 50]} />
            <Sky sunPosition={[100, 100, 20]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} castShadow intensity={0.8} />
            <FPV />
            <Physics gravity={[0, -9.81, 0]}>
              <Player />
              <Cubes />
              <Ground />
              <Enemies />
            </Physics>
            <Hand />
          </Canvas>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="w-4 h-4 border-2 border-white/50 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
          <TextureSelector />
          <HUD />
          <div className="absolute bottom-4 left-4 text-white/50 text-xs uppercase tracking-widest font-mono">
            Frontline Voxel v0.1.0-alpha
          </div>
        </>
      )}
    </div>
  );
}
