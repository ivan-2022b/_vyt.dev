import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Islands from './components/Islands';

function App() {
  return (
    <Router> {/* basename="/_vyt.dev"> */}
      <div className="synthwave-holding">
        <div className="sun"></div>
        <div className="underlay"></div>
        <div className="underlay glitch"></div>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/privacy" element={<p>Privacy page</p>} />
        <Route path="/recursive-islands" element={<Islands />} />
      </Routes>
      <footer className="classy-footer">
        <div className="container">
            &copy; 2025 - vyt.dev in ASP.NET Core 9.0 w/ React.js SPA - <Link className="classy-link" to="/privacy">Privacy</Link>
        </div>
      </footer>
    </Router>
  )
}

export default App
