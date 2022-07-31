import '../styles/Help.scss';
import ShortNavBar from "../components/NavBar/ShortNavBar";
import NavBar from "../components/NavBar/NavBar";
import ReactPlayer from 'react-player';

function Help () {
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
    return (<>
        {!token ? <ShortNavBar />: <NavBar />}
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container">
                <h2>Help</h2>
                <article>
                    <p>Please check out the videos below to see how you can navigate the website. If you still have additional questions, you can reach out to us at <a className="aboutus-page__links" href="mailto:info@my-web-accountant.com"> info@my-web-accountant.com</a></p>
                </article>
                <article>
                    <ReactPlayer width='60vw' height='50vw' controls url='https://www.youtube.com/watch?v=7sDY4m8KNLc' />
                </article>
            </section>
        </main>
    </>)
}

export default Help;