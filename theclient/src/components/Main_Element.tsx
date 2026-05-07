export default function Main() {
    return (
        <section className="primary">
            <h2 id="focus-hub" className="focus-hub">Our Services</h2>

            <div className="grid" aria-label="services list">
                <article className="card" tabIndex={0} aria-labelledby="service-one">
                    <h3 id="service-one">Energy / Utility Assistance</h3>
                    <p>Help with energy bills and utility support for qualifying households.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-two">
                    <h3 id="service-two">Housing (Section 8)</h3>
                    <p>Information and applications for housing assistance and vouchers.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-three">
                    <h3 id="service-three">Weatherization</h3>
                    <p>Energy-saving improvements to reduce heating and cooling costs.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-four">
                    <h3 id="service-four">Head Start</h3>
                    <p>Early childhood education, health, and family support services.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-five">
                    <h3 id="service-five">Family Planning</h3>
                    <p>Resources and guidance for family planning and reproductive health.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-six">
                    <h3 id="service-six">Foster Grandparents</h3>
                    <p>Volunteer opportunities for seniors to mentor and support children.</p>
                    <p>+ other info</p>
                </article>

                <article className="card" tabIndex={0} aria-labelledby="service-seven">
                    <h3 id="service-seven">CSBG Outreach</h3>
                    <p>Community services and outreach programs funded by HHS via the Missouri Department of Social Services.</p>
                    <p>+ other info</p>
                </article>

                {/* placeholders to fill 3x3 grid visually if needed */}
                {/*<article className="card placeholder" aria-hidden="true" tabIndex={-1}></article>*/}
                {/*<article className="card placeholder" aria-hidden="true" tabIndex={-1}></article>*/}
            </div>
        </section>
    )
}
