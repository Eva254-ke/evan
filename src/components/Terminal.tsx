'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const commands: Record<string, string> = {
  help: `Available commands:
  about     - About Zachariah Evans
  skills    - List technical skills
  projects  - Show projects and impact
  contact   - Contact info
  clear     - Clear the screen
  exit      - Exit the terminal (close tab)`,

  about: `I am Zachariah Evans, an AI Software Engineer specializing in secure intelligent systems and autonomous agent development.
Passionate about crafting AI solutions that combine innovation with security.`,

  skills: `AI/ML Frameworks: TensorFlow, PyTorch, OpenAI Gym
Security: Cryptography, Secure Multi-party Computation
Autonomous Systems: Reinforcement Learning, Multi-agent Systems
Cloud/DevOps: Azure, AWS, Docker, Kubernetes`,

  projects: `Project 1: Autonomous Threat Detection
- Used reinforcement learning to identify threats in real-time.
- Reduced incident response time by 45%.
  
Project 2: Secure Intelligent Agents
- Developed secure multi-agent systems.
- Enhanced predictive accuracy and system trust.`,

  contact: `Email: zachariah.evans@example.com
LinkedIn: linkedin.com/in/zachariahevans
GitHub: github.com/zachariahevans`,
};

export default function Terminal() {
  // 3D Model component
  function Model() {
    const { scene } = useGLTF('https://drive.google.com/uc?export=download&id=1piGKv85wGbqVdyT-ZLmMdOy606_cFx68');
    return <primitive object={scene} />;
  }
  const [lines, setLines] = useState<string[]>([
    "Welcome to Zachariah Evans' interactive portfolio terminal!",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (command === 'clear') {
      setLines([]);
    } else if (command === 'exit') {
      window.close();
    } else if (commands[command]) {
      setLines((prev) => [...prev, `> ${cmd}`, commands[command]]);
    } else {
      setLines((prev) => [...prev, `> ${cmd}`, `Command not found: ${cmd}. Type 'help' for commands.`]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-black text-green-400 font-mono px-6 py-4 flex items-center border-b border-green-700">
        <div>
          <span className="text-lg font-bold block">Zachariah Evans</span>
          <span className="text-sm block mt-1">AI Software Engineer</span>
        </div>
      </nav>
      <div className="flex flex-1">
        <div className="w-1/3 h-full bg-black flex items-center justify-center border-r border-green-700">
          <Canvas style={{ height: '350px', width: '100%' }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 2]} />
            <Model />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="bg-black text-green-400 font-mono flex-1 p-4 overflow-auto">
          {lines.map((line, i) => (
            <pre key={i} className="whitespace-pre-wrap">{line}</pre>
          ))}

          <form onSubmit={onSubmit} className="flex mt-2">
            <span className="mr-2">{'>'}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-black text-green-400 font-mono flex-grow outline-none"
              autoComplete="off"
              autoFocus
              placeholder="Type a command..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
