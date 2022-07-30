import ShortNavBar from "../components/NavBar/ShortNavBar";
import NavBar from "../components/NavBar/NavBar";
//import {Link} from 'react-router-dom';

const axiosURL=process.env.REACT_APP_AXIOSURL

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
                    <p>Visit the help section to get an idea of how to navigate the website. Or you can jump right in, register your account, and start exploring.</p>
                    <p>This is the fully relaized version of my capstone project for <a href="https://brainstation.io/">Brainstation's</a> Web development bootcamp.</p>
                    <p>Developers can find the github repo for this site <a href='https://github.com/menu89/fatima-abrar-client-my-web-accoutant-capstone'> here</a>. The related server repo is <a href='https://github.com/menu89/fatima-abrar-server-my-web-accoutant-capstone'> here</a>.</p>
                    <p>Server API documentation can be found <a href={axiosURL}> here</a>.</p>
                </article>
            </section>
        </main>
    </>)
}

export default AboutUs;