import ShortNavBar from "../components/NavBar/ShortNavBar";
import NavBar from "../components/NavBar/NavBar";
import listSvg from '../assets/icon/list.svg';
import loginSvg from '../assets/icon/login.svg';
import registrationSvg from '../assets/icon/registration.svg';
import helpSvg from '../assets/icon/help.svg';
import aboutSvg from '../assets/icon/about.svg';
import creditsSvg from '../assets/icon/clipboard.svg';
import dahboardSvg from '../assets/icon/dashboard.svg';
import accListSvg from '../assets/icon/accounting.svg';
import actionSvg from '../assets/icon/action-camera.svg';
import tranHisSvg from '../assets/icon/history-paper.svg';
import logOutSvg from '../assets/icon/logout.svg';
import editSvg from '../assets/icon/edit.svg';
import deleteSvg from '../assets/icon/remove.svg';
import cashflowSvg from '../assets/icon/cash-flow.svg';

//this page is to list recognitions for artists whose material has been used to build the website.
function Credits () {
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    return (
        <>
        {!token && <ShortNavBar /> }
        {token && <NavBar />}
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
                    <li>
                        <img className="credits-page__icons" src={dahboardSvg} alt='dashboard icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links"  href="https://iconscout.com/icons/dashboard-apps">Dashboard Apps Icon</a> by <a className="credits-page__links"  href="https://iconscout.com/contributors/rengised" >Alex Martynov</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={accListSvg} alt='account list icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/list">List Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/delesign" >Delesign Graphics</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={actionSvg} alt='action icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/action-camera" >Action Camera Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/adri-creative">Adri Ansyah</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={tranHisSvg} alt='transaction history icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/history-paper" > History Paper Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/lutfix"> LUTFI ACHMAD</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={logOutSvg} alt='log out icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/logout">Logout Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/iconkanan">iconkanan</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={editSvg} alt='edit icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/edit">Edit Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/dalpattapaniya">Dalpat Prajapati</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={deleteSvg} alt='delete icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/remove">Remove Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/jemismali">Jemis Mali</a>
                        </p>
                    </li>
                    <li>
                        <img className="credits-page__icons" src={cashflowSvg} alt='cashflow icon' />
                        <p className="credits-page__para">
                            <a className="credits-page__links" href="https://iconscout.com/icons/cash-flow">Cash Flow Icon</a> by <a className="credits-page__links" href="https://iconscout.com/contributors/uniconlabs">Uniconlabs</a> on <a className="credits-page__links" href="https://iconscout.com">IconScout</a>
                        </p>
                    </li>
                </ul>
            </section>
        </main>
        </>
    )
}

export default Credits;