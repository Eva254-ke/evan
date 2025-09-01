'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

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

  projects: `1. NexaRealty
   Used Flutter and Unity XR SDKs to build a scalable AR/VR science education platform, enabling immersive 3D learning and reducing dev cycle time by 30%.
   Impact: Validated core interactions for cross-platform deployment (Android/iOS/XR).

2. Roombaya
   Applied AI-driven recommendations and real-time analytics (Python, Firebase) to increase hotel booking value by 20% and provide actionable conversion insights.
   Impact: Built predictive models for abandonment detection, boosting direct revenue.
   https://roombaya.com/

3. JoyBeautty
   Developed a mobile-first spa booking platform (React, Node.js) with AI demand prediction, increasing appointment uptake by 40% and reducing no-shows by 25%.
   Impact: Optimized staff scheduling and improved user experience across devices.
   https://joybeautty.com/`,

  contact: `Email: zachariah.evans@example.com
LinkedIn: linkedin.com/in/zachariahevans
GitHub: github.com/zachariahevans`,
};

export default function Terminal() {
  // Centered 3D Model component
  function CenteredModel({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    // Center and auto-scale the model to fit the sidebar (responsive)
    React.useEffect(() => {
      const box = new Box3().setFromObject(scene);
      const size = box.getSize(new Vector3());
      // Get sidebar dimensions from window size
      const sidebarWidth = window.innerWidth >= 768 ? window.innerWidth * 0.25 : window.innerWidth;
      const sidebarHeight = window.innerWidth >= 768 ? window.innerHeight : 256;
      // Calculate scale to fit both width and height
      const scaleX = sidebarWidth / size.x;
      const scaleY = sidebarHeight / size.y;
      const scaleZ = sidebarHeight / size.z;
      const scale = Math.min(scaleX, scaleY, scaleZ) * 0.8; // 0.8 for padding
      scene.scale.set(scale, scale, scale);
      // Center
      const center = box.getCenter(new Vector3());
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }, [scene]);
    return <primitive object={scene} />;
  }
  const [lines, setLines] = useState<string[]>([
    "evans@portfolio:~$ welcome",
    "Hi, I'm Zachariah Evans, an AI Software Engineer.",
    "Welcome and explore my portfolio, discover my skills, projectsand get in touch. Type 'help' to see what you can do!",
    "AI powered terminal!."
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const prompt = "evans@portfolio:~$";
  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (command === 'clear') {
      setLines([]);
    } else if (command === 'exit') {
      window.close();
    } else if (commands[command]) {
      setLines((prev) => [...prev, `${prompt} ${cmd}`, commands[command]]);
    } else {
      setLines((prev) => [...prev, `${prompt} ${cmd}`, `Command not found: ${cmd}. Type 'help' for commands.`]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      handleCommand(input);
      setInput('');
    }
  };

  // Date and time for footer
  const [dateTime, setDateTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
  <div className="h-screen flex flex-col">
  <nav className="bg-black text-green-400 font-mono px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-green-700">
        <div className="mb-2 md:mb-0">
          <span className="text-lg font-bold block">Zachariah Evans</span>
          <span className="text-sm block mt-1 text-white">AI Software Engineer</span>
        </div>
        <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-black font-extrabold text-base px-4 py-2 rounded shadow-lg border-2 border-green-600 mr-4 animate-pulse">
            Let me launch your MVP quickly.
          </span>
          <a
            href="https://drive.google.com/uc?export=download&id=18oE40EY1lV9LMXzCuHFODgdKdH3jwRl8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-400 text-white px-4 py-2 rounded font-bold shadow-lg border-2 border-green-600 hover:bg-green-500 transition-colors"
            style={{ textDecoration: 'none' }}
          >
            Download Resume
          </a>
          <a href="https://www.linkedin.com/in/zachariah-evans-845899349" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.59v5.606z"/></svg>
          </a>
          <a href="https://github.com/Eva254-ke" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.585 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </nav>
      <div className="flex flex-1 flex-col md:flex-row h-full">
  <div className="w-full md:w-1/4 h-64 md:h-full bg-black flex items-stretch justify-center border-b md:border-b-0 md:border-r border-green-700">
          <iframe
            src="https://tinyglb.com/viewer/67bed08e035c49c88ecd3eba873c0239"
            style={{ border: 0, height: '100%', width: '100%' }}
            title="TinyGLB 3D Model"
            allow="fullscreen"
          ></iframe>
        </div>
  <div className="bg-black font-mono flex-1 p-2 md:p-4 overflow-auto">
          {/* Set the prompt username for easy change */}
          {(() => {
            const prompt = "evans@portfolio:~$"; // Change to 'gatere@portfolio:~$' for Mark Gatere
            return lines.map((line, i) => {
              // Section header detection: lines that end with ':'
              const isHeader = /:$/.test(line.trim());
              // User command detection: lines that start with the prompt
              const isUserCommand = line.startsWith(prompt);
              // First line: prompt and welcome
              if (i === 0) {
                const [_, ...rest] = line.split(' ');
                return (
                  <pre key={i} className="whitespace-pre-wrap font-bold text-lg mb-2">
                    <span className="text-blue-400">{prompt}</span>{' '}
                    <span className="text-green-400">{rest.join(' ')}</span>
                  </pre>
                );
              }
              // Next two lines: intro, always white
              if (i === 1 || i === 2) {
                return (
                  <pre key={i} className="whitespace-pre-wrap text-white text-lg font-semibold mb-2">{line}</pre>
                );
              }
              // User-typed commands: show prompt in blue, command in green
              if (isUserCommand) {
                const cmdText = line.replace(prompt, '').trim();
                return (
                  <pre key={i} className="whitespace-pre-wrap font-bold">
                    <span className="text-blue-400">{prompt}</span>{' '}
                    <span className="text-green-400">{cmdText}</span>
                  </pre>
                );
              }
              // Section headers: always show prompt in blue, section name in green
              if (isHeader) {
                return (
                  <pre key={i} className="whitespace-pre-wrap font-bold mt-4">
                    <span className="text-blue-400">{prompt}</span>{' '}
                    <span className="text-green-400">{line.replace(':', '')}</span>
                  </pre>
                );
              }
              // Section content white
              if (i > 2) {
                // Always render URLs in the projects output as blue clickable links
                if (lines.some(l => l.includes('NexaRealty') || l.includes('Roombaya') || l.includes('JoyBeautty'))) {
                  // Replace URLs with blue colored anchor tags using inline style and <font color> for guaranteed color
                  const withLinks = line.replace(/(https?:\/\/[\w\-\.]+\.[a-zA-Z]{2,}(?:[\w\-\.\/?=&%#]*)?)/g, (url) =>
                    `<a href='${url}' target='_blank' rel='noopener noreferrer' style='color:#60a5fa;text-decoration:underline'><font color='#60a5fa'>${url}</font></a>`
                  );
                  return (
                    <pre key={i} className="whitespace-pre-wrap text-white mb-2">
                      <span dangerouslySetInnerHTML={{ __html: withLinks }} />
                    </pre>
                  );
                } else {
                  return (
                    <pre key={i} className="whitespace-pre-wrap text-white mb-2">{line}</pre>
                  );
                }
              }
              // Default: fallback
              return (
                <pre key={i} className="whitespace-pre-wrap text-green-400">{line}</pre>
              );
            });
          })()}

          <form onSubmit={onSubmit} className="flex mt-2">
            <span className="mr-2 text-blue-400 font-bold">evans@portfolio:~$</span>
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
  <footer className="bg-black text-green-400 font-mono px-4 py-2 md:px-6 border-t border-green-700 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-base w-full">
    <div className="flex flex-col md:flex-row items-center w-full justify-between">
      <div className="mb-1 md:mb-0 text-center md:text-left w-full md:w-auto">&copy; {new Date().getFullYear()} Zachariah Evans. All rights reserved.</div>
      {mounted && (
        <div className="text-green-400 text-center md:text-right w-full md:w-auto">
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </div>
      )}
    </div>
  </footer>
    </div>
  );
}
