import ShortNavBar from "../components/NavBar/ShortNavBar";
import NavBar from "../components/NavBar/NavBar";
import {Link} from 'react-router-dom';
import { API_URL } from "../config";

const axiosURL = API_URL

function AboutUs () {
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    return (<>
        {!token ? <ShortNavBar />: <NavBar />}
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container">
                <h2>About this Site</h2>
                <article>
                    <p>The purpose of this site is help individuals track and plan their monthly spending even without any prior knowledge of accounting concepts or excel.</p>
                    <p>Visit the <Link to='/help'  className="aboutus-page__links"> help section </Link> to get an idea of how to navigate the website. Or you can jump right in, <Link to='/register'  className="aboutus-page__links"> register your account</Link>, and start exploring.</p>
                    <p>This is the fully relaized version of my capstone project for <a className="aboutus-page__links" href="https://brainstation.io/">Brainstation's</a> Web development bootcamp.</p>
                    <p>Developers can find the github repo for this site <a className="aboutus-page__links" href='https://github.com/menu89/fatima-abrar-client-my-web-accoutant-capstone'> here</a>. The related server repo is <a className="aboutus-page__links" href='https://github.com/menu89/fatima-abrar-server-my-web-accoutant-capstone'> here</a>.</p>
                    <p>Server API documentation can be found <a className="aboutus-page__links" href={axiosURL}> here</a>.</p>
                </article>
            </section>
        </main>
    </>)
}

export default AboutUs;