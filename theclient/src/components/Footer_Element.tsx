import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="classy-footer" role="contentinfo">
                <div className="classy-footer-grid" aria-label="footer information">
                    <article className="subtle-card" aria-labelledby="about">
                        <h3 id="about">About Us</h3>
                        <address>
                        Ozarks Area Community Action Corporation<br />
                        215 S. Barnes Ave.<br />
                        Springfield, MO 65802<br />
                        Phone: (417) 862-4314<br />
                        Fax: (417) 864-3499
                        </address>
                        <p><strong>We're open:</strong><br />Monday—Friday, 8:00 AM—5:00 PM</p>
                    </article>

                    <article className="subtle-card" aria-labelledby="volunteer">
                        <h3 id="volunteer">Volunteer</h3>
                        <p>Opportunities to serve through Head Start, CSBG, and community events.</p>
                        <p><Link to="/volunteer">Volunteer today</Link></p>
                    </article>

                    <article className="subtle-card" aria-labelledby="links">
                        <h3 id="links">Links</h3>
                        <p><Link to="/news">News</Link></p>
                        <p><Link to="/events">Events</Link></p>
                        <p><Link to="/donate">Donate</Link></p>
                    </article>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 OACAC. All rights reserved.</p>
                    <p><Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link></p>
                </div>
            </footer>
        </>
    )
}
