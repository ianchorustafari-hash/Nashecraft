import { useStore } from '../hooks/useStore';
import { useShallow } from 'zustand/react/shallow';
import { Save, Map } from 'lucide-react';

export const HUD = () => {
  const [cubes, saveWorld, kills] = useStore(
    useShallow((state: any) => [state.cubes, state.saveWorld, state.kills])
  );

  return (
    <div className="absolute top-4 left-4 flex items-start gap-4 pointer-events-none z-30 w-full pr-8">
      {/* Character Portrait */}
      <div className="flex flex-col gap-2">
        <div className="w-20 h-20 bg-zinc-800 border-2 border-zinc-600 rounded-lg overflow-hidden flex flex-col pointer-events-auto">
          <div className="flex-1 bg-zinc-700 flex items-center justify-center">
            {/* Blocky Face Representation */}
            <div className="w-12 h-12 relative bg-[#ffdbac]">
               {/* Hair */}
               <div className="absolute top-0 left-0 w-full h-3 bg-black" />
               {/* Mustache */}
               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black" />
               {/* Eyes */}
               <div className="absolute top-5 left-2 w-2 h-1 bg-black opacity-80" />
               <div className="absolute top-5 right-2 w-2 h-1 bg-black opacity-80" />
            </div>
          </div>
          <div className="h-6 bg-red-900 text-[10px] flex items-center justify-center text-white font-bold uppercase tracking-tighter">
            Commander
          </div>
        </div>

        {/* Minimap Placeholder */}
        <div className="w-20 h-20 bg-zinc-900/80 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,green_1px,transparent_1px)] bg-[size:10px_10px]" />
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <div className="absolute top-2 left-2 text-[8px] text-zinc-500 uppercase font-bold">Radar</div>
          </div>
        </div>

        {/* Compass */}
        <div className="w-20 bg-zinc-900/80 border border-white/10 rounded-lg p-1 flex items-center justify-center">
           <div className="text-[10px] text-white font-mono tracking-widest">N • E • S • W</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-1">
        <div className="bg-zinc-900/80 px-3 py-1 rounded border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Health</div>
          <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-red-600" />
          </div>
        </div>
        <div className="bg-zinc-900/80 px-3 py-1 rounded border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Kills</div>
          <div className="text-white font-mono text-sm">{kills}</div>
        </div>
        <div className="bg-zinc-900/80 px-3 py-1 rounded border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Blocks</div>
          <div className="text-white font-mono text-sm">{cubes.length}</div>
        </div>
      </div>

      <div className="flex-1" />

      <button 
        onClick={() => saveWorld()}
        className="pointer-events-auto bg-zinc-900/80 hover:bg-zinc-800 p-3 rounded-lg border border-white/10 backdrop-blur-sm text-white transition-colors"
        title="Save World"
      >
        <Save size={20} />
      </button>
    </div>
  );
};
