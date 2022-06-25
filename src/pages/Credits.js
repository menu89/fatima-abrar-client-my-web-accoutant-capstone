import ShortNavBar from "../components/NavBar/ShortNavBar";
import listSvg from '../assets/icon/list.svg';
import loginSvg from '../assets/icon/login.svg';
import registrationSvg from '../assets/icon/registration.svg';
import helpSvg from '../assets/icon/help.svg';
import aboutSvg from '../assets/icon/about.svg';
import creditsSvg from '../assets/icon/clipboard.svg';

//this page is to list recognitions for artists whose material has been used to build the website.
function Credits () {
    return (
        <>
        <ShortNavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container">
                <h2>Recognitions:</h2>
                <p>The icons used on this website were taken from another website. Please see recognition for the artists below:</p>
                <ul>
                    <li>
                        <img className="credits-page__icons" src={listSvg} alt="list icon" />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/list" >List Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/jemismali">Jemis Mali</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={loginSvg} alt="log in icon" />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/login">Login Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/iconhome">Icon Home</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={registrationSvg} alt="register icon"/>
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/registration" >Registration Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/iconscout">IconScout Store</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={helpSvg} alt="help icon"/>
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/help" >Help Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/jemismali">Jemis Mali</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={aboutSvg} alt="about icon" />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/about">About Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/laura-reen">Laura Reen</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={creditsSvg} alt="clipboard (credits) icon" />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/clipboard" >Clipboard Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/anggaraputra">Anggara Putra</a>
                        </p>
                    </li>
                </ul>
            </section>
        </main>
        </>
    )
}

export default Credits;