import { useEffect } from 'react'
import './App.css'
import { useTheme } from './ThemeContext.jsx'
import Header from './Header.jsx'

function App() {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <div className="title-box">
        <h2>FSD PRACTICAL by SIDDHARTH(23BCG10016)</h2>
      </div>
      <Header />
      <div className="card">
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>
    </>
  )
}

export default App
