import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { useShallow } from 'zustand/react/shallow';
import { useKeyboard } from '../hooks/useKeyboard';

const images = {
  dirt: '🟫',
  grass: '🟩',
  glass: '⬜',
  wood: '🪵',
  log: '🌲',
  bunker: '🧱',
  steel: '🛡️',
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore(
    useShallow((state: any) => [state.texture, state.setTexture])
  );
  const { dirt, grass, glass, wood, log, bunker, steel } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log, bunker, steel };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-zinc-900/80 p-2 rounded-xl border border-white/10 backdrop-blur-sm z-30">
        {Object.entries(images).map(([k, src]) => {
          return (
            <div
              key={k}
              className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition-all ${
                k === activeTexture ? 'bg-red-600 scale-110 shadow-lg shadow-red-600/20' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {src}
            </div>
          );
        })}
      </div>
    )
  );
};
