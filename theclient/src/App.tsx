// imported dependencies
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// imported stylesheet
import './App.css'

// imported .tsx / React.js-ified components
import Header from './components/Header_Element';
import Main from './components/Main_Element';
import Footer from './components/Footer_Element';

// App.tsx is the root component of the application,
// responsible for rendering the main layout and managing global state such as dark mode and scroll behavior.
// It uses React Router for client-side routing to different pages of the site.
// The Header and Footer components are rendered on every page, while routed components are rendered based on the URL.
// The App component also handles toggling dark mode and applying the appropriate theme based on user preference stored in localStorage.
function App() {
  // theme & state management
  const savedMode = localStorage.getItem('oacac-theme') === 'light';
  const [lightMode, setLightMode] = useState(savedMode ?? false) // default to dark mode :)
  const [currentScrollState, setCurrentScrollState] = useState(false) // shows / hides header
  
  applyTheme()

  // runs once on startup, not on every state change
  useEffect(() => {
    // directly controls when the header should be shown or hidden based on window.scrollY, or the verical scroll value
    const handleScroll = () : void => {
      setCurrentScrollState(window.scrollY > window.innerHeight / 8)
    }

    // pass the handleScroll function to the scroll event listener, and clean up on unmount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [window.innerHeight]) // only re-run if the window height changes, which is the threshold for showing/hiding the header

  function toggleLightMode() : void {
    setLightMode(prev => {
      localStorage.setItem('oacac-theme', (!prev).toString()); // save theme changes to storage
      return !prev
    })
  }

  function applyTheme() : void {
    console.log(`Before applying theme. Light mode is: ${lightMode}`)
    lightMode ?
      document.documentElement.setAttribute('data-theme', 'light') :
      document.documentElement.hasAttribute('data-theme') && document.documentElement.removeAttribute('data-theme')
    console.log(`Theme applied. Light mode is: ${lightMode}`)
  }

  return ( // the actual html structure of the app
    <Router>
      <Header currentScrollState={currentScrollState} lightMode={lightMode} toggleLightMode={toggleLightMode} />
      <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/careers" element={<h2 className="accessible-outline" tabIndex={0}>Careers page!</h2>} />
        <Route path="/contact" element={<h2 className="accessible-outline" tabIndex={0}>Contact page!</h2>} />
        <Route path="/donate" element={<h2 className="accessible-outline" tabIndex={0}>Donate page!</h2>} />
        <Route path="/volunteer" element={<h2 className="accessible-outline" tabIndex={0}>Volunteer page!</h2>} />
        <Route path="/news" element={<h2 className="accessible-outline" tabIndex={0}>News page!</h2>} />
        <Route path="/events" element={<h2 className="accessible-outline" tabIndex={0}>Events page!</h2>} />
        <Route path="/privacy-policy" element={<h2 className="accessible-outline" tabIndex={0}>Privacy Policy!</h2>} />
        <Route path="/terms-of-service" element={<h2 className="accessible-outline" tabIndex={0}>Terms of Service!</h2>} />
      </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
