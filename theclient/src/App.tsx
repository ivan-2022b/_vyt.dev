import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

var eventLocked: boolean = false;
// const oldText: string = "Bem-vindo, você";
const newText: string = "Welcome, you";
const upper_letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lower_letters: string = "abcdefghijklmnopqrstuvwxyzê";

function App() {
  const [currentText, setCurrentText] = useState("Bem-vindo, você");
  // const textRef = useRef<HTMLHeadingElement>(null); // old artifact

  const handleMouseOver = () => {
    if (eventLocked)
      return;
    eventLocked = true;
    console.log("Mouse overed!");

    // core logic section
    let iteration: number = 0;
    const interval = setInterval(() => { // glorified for-loop
      setCurrentText(prev => // describes each iteration
        prev
          .split("")
          .map((letter, index) => { // specialized character animation
            if (index < iteration) { return newText[index]; }
            if (Math.abs(index - iteration) > 1.5) {
              if (upper_letters.includes(currentText[index])) { return upper_letters[Math.floor(Math.random() * 26)]; }
              if (lower_letters.includes(currentText[index])) { return lower_letters[Math.floor(Math.random() * 27)]; }
            }
            console.log("iteration: " + iteration + ", prev: " + prev); // testing
            return letter;
          }).join("")
      )
      iteration += 1/4;
      if (iteration > currentText.length) { clearInterval(interval); /* end glorified for-loop */ }
    }, 40);

    setTimeout(() => {
      eventLocked = false;
    }, 4000);
  }

  /* old artifact
  useEffect(() => {
    // access the h1 element after it's rendered
    if (textRef.current) {
      // console.log(textRef.current.innerText); // read the text
      textRef.current.innerText = currentText; // update the text (not recommended in React)
    }
  }, [currentText]); */

  return (
    <Router>
      <div className="synthwave-holding">
        <div className="sun"></div>
        <div className="underlay"></div>
        <div className="underlay glitch"></div>
      </div>
      <div className="welcome-holding">
        <h1 id="welcome" className="welcome" onMouseOver={handleMouseOver}>{currentText}</h1>
        <p>Visit <a href="/practicing">practicing</a> & <a href="/islands">island mapping</a>!</p>
      </div>
      <Routes>
        <Route index element={<p>Index!</p>} />
        <Route path="/privacy" element={<p>Privacy page</p>} />
      </Routes>
      <footer className="classy-footer">
        <div className="container">
            &copy; 2025 - vyt.dev in ASP.NET Core 9.0 w/ React.js SPA - <a className="classy-link" href="/privacy">Privacy</a>
        </div>
      </footer>
    </Router>
  )
}

export default App
