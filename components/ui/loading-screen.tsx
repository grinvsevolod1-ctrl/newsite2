"use client"

import { useEffect, useState } from "react"
import { Code2, Zap, Terminal, Cpu } from 'lucide-react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isHiding, setIsHiding] = useState(false)
  const [codeLines, setCodeLines] = useState<string[]>([])
  
  const codeSnippets = [
    "import { optimize } from 'performance'",
    "const app = new NextApp()",
    "await database.connect()",
    "Loading modules...",
    "Initializing components...",
    "Ready to code! 🚀"
  ]
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsHiding(true), 300)
          return 100
        }
        return prev + 3
      })
    }, 30)
    
    const codeInterval = setInterval(() => {
      setCodeLines(prev => {
        const nextIndex = prev.length
        if (nextIndex < codeSnippets.length) {
          return [...prev, codeSnippets[nextIndex]]
        }
        return prev
      })
    }, 400)
    
    return () => {
      clearInterval(progressInterval)
      clearInterval(codeInterval)
    }
  }, [])
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center transition-all duration-700 ${isHiding ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 bg-cyan-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative flex flex-col items-center gap-8 px-4 max-w-md w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-60 animate-pulse group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 rounded-2xl blur-xl opacity-40 animate-ping" style={{ animationDuration: '2s' }} />
          
          <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl p-[3px] animate-pulse">
            <div className="bg-gradient-to-br from-slate-950 to-black rounded-[13px] h-28 w-28 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-600/10" />
              <span className="relative text-6xl font-black bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                NN
              </span>
            </div>
          </div>
          
          <Zap className="absolute -top-2 -right-2 h-7 w-7 text-cyan-400 animate-bounce" style={{ animationDuration: '1s' }} />
          <Terminal className="absolute -top-2 -left-2 h-6 w-6 text-blue-400 animate-pulse" />
          <Code2 className="absolute -bottom-2 -left-2 h-6 w-6 text-purple-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Cpu className="absolute -bottom-2 -right-2 h-7 w-7 text-cyan-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            NetNext
          </h2>
          <p className="text-xs text-cyan-400/70 uppercase tracking-[0.3em] font-light">
            Studio
          </p>
        </div>
        
        <div className="w-full bg-slate-950/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 font-mono text-xs space-y-1.5">
          {codeLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2 text-cyan-400/80 animate-fadeIn">
              <span className="text-green-500">{'>'}</span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-green-500">{'>'}</span>
            <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <div className="relative w-full h-2 bg-slate-900/50 backdrop-blur-sm rounded-full overflow-hidden border border-cyan-500/20">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full blur-sm opacity-50 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400 font-semibold">{progress}%</span>
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
