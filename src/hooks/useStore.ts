import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Cube {
  key: string;
  pos: [number, number, number];
  texture: string;
}

interface WorldState {
  texture: string;
  cubes: Cube[];
  kills: number;
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  incrementKills: () => void;
  saveWorld: () => void;
  resetWorld: () => void;
  generateInitialWorld: () => void;
}

const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
const setLocalStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<WorldState>((set) => ({
  texture: 'dirt',
  cubes: getLocalStorage('cubes') || [],
  kills: 0,
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [cx, cy, cz] = cube.pos;
        return cx !== x || cy !== y || cz !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  incrementKills: () => {
    set((prev) => ({ kills: prev.kills + 1 }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage('cubes', prev.cubes);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
  generateInitialWorld: () => {
    const initialCubes = [];
    // Create a small bunker
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        for (let y = 0; y <= 2; y++) {
          if (y === 2 || Math.abs(x) === 2 || Math.abs(z) === 2) {
            initialCubes.push({
              key: nanoid(),
              pos: [x, y, z],
              texture: 'bunker',
            });
          }
        }
      }
    }
    set(() => ({ cubes: initialCubes }));
  },
}));
