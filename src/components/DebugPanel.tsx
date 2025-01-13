import { useState, useEffect } from "react";

export function DebugPanel() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    // Override console.log
    console.log = (...args) => {
      originalConsoleLog.apply(console, args);
      setLogs(prev => [...prev, args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')]);
    };

    // Override console.error
    console.error = (...args) => {
      originalConsoleError.apply(console, args);
      setLogs(prev => [...prev, "ERROR: " + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')]);
    };

    return () => {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <div className="mt-8 p-4 bg-black/90 text-green-400 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-mono">Debug Console</h2>
        <button 
          onClick={() => setLogs([])}
          className="px-2 py-1 text-sm bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded"
        >
          Clear
        </button>
      </div>
      <div className="h-[300px] overflow-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="py-1 border-b border-gray-700/50 whitespace-pre-wrap">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}