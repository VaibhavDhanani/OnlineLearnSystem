import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpIn from './components/SignInUp/SignUpIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUpIn />
    </>
  )
}

export default App
