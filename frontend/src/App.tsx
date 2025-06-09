import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 p-6 transition-all duration-300 animate-spin-slow hover:drop-shadow-[0_0_2em_#61dafbaa]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold">Vite + React</h1>
      <div className="p-8">
        <button className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-800 cursor-pointer transition-colors hover:border-blue-500" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="my-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
