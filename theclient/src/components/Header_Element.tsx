import { Link } from 'react-router-dom'

export default function Header(props: {currentScrollState: boolean, darkMode: boolean, toggleDarkMode: () => void}) {
    return (
        <>
            <a className="skip-link" href="#main-content">Skip to content</a>
            <header id="site-header"
                    className="hero-header"
                    style={{'transform': props.currentScrollState ? 'translateY(-120%)' : ''}}
                    role="banner"
                    aria-hidden={props.currentScrollState ? 'true' : 'false'}>
                <div className="header-inner">
                    <div className="header-part-one" aria-label="branding and phone">
                        <Link to="/" className="logo" aria-label="OACAC home">OACAC</Link>
                        <p className="phone" aria-label="phone number">(417) 862-4314</p>
                    </div>

                    <div className="header-part-two" aria-label="site actions">
                        <nav role="navigation" aria-label="top links">
                            <ul className="top-links">
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/donate">Donate</Link></li>
                            </ul>
                        </nav>

                        <div className="controls">
                            <button id="contrast-toggle"
                                aria-pressed={props.darkMode ? 'true' : 'false'}
                                aria-label="toggle dark mode"
                                title="toggle dark mode"
                                onClick={props.toggleDarkMode}>
                            {props.darkMode ? 'Dark' : 'Light'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
