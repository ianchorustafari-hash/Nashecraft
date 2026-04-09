import * as THREE from 'three';

const createTexture = (color: string, pattern?: 'grass' | 'dirt' | 'wood' | 'glass' | 'log') => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d')!;

  // Base color
  context.fillStyle = color;
  context.fillRect(0, 0, 64, 64);

  // Add noise/pattern
  context.fillStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < 100; i++) {
    context.fillRect(Math.random() * 64, Math.random() * 64, 2, 2);
  }

  if (pattern === 'grass') {
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(0, 0, 64, 16);
  } else if (pattern === 'wood') {
    context.strokeStyle = 'rgba(0,0,0,0.3)';
    context.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      context.beginPath();
      context.moveTo(0, i * 16);
      context.lineTo(64, i * 16);
      context.stroke();
    }
  } else if (pattern === 'log') {
    context.strokeStyle = 'rgba(0,0,0,0.4)';
    context.lineWidth = 4;
    context.strokeRect(4, 4, 56, 56);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

export const dirtTexture = createTexture('#5d4037', 'dirt');
export const grassTexture = createTexture('#4caf50', 'grass');
export const glassTexture = createTexture('#81d4fa', 'glass');
export const woodTexture = createTexture('#795548', 'wood');
export const logTexture = createTexture('#3e2723', 'log');
export const bunkerTexture = createTexture('#757575', 'log'); // Concrete look
export const steelTexture = createTexture('#455a64', 'wood'); // Steel look
export const groundTexture = createTexture('#333333');

groundTexture.repeat.set(100, 100);
