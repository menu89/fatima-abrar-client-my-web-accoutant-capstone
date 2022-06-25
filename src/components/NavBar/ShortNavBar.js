import './ShortNavBar.scss';
import linkSvg from '../../assets/icon/list.svg';
import loginSvg from '../../assets/icon/login.svg';
import registrationSvg from '../../assets/icon/registration.svg';
import helpSvg from '../../assets/icon/help.svg';
import aboutSvg from '../../assets/icon/about.svg';
import creditsSvg from '../../assets/icon/clipboard.svg';
import {Link} from 'react-router-dom';

function ShortNavBar () {
    return (
        <>
        <header className='heading'>
            <img src={linkSvg} alt="list icon" className='heading__icon' />
            <nav className='short-navigation'>
                <ul className='short-navigation__list'>
                    <li className='short-navigation__list-item'>
                        <Link to='/'>
                            <img src={loginSvg} alt="log in icon" className='short-navigation__icon short-navigation__icon--one' />
                        </Link>
                        <Link to='/' className='short-navigation__link'>Log In</Link>
                    </li>
                    <li className='short-navigation__list-item'>
                        <Link to='/register' >
                            <img src={registrationSvg} alt="registration icon" className='short-navigation__icon short-navigation__icon--two' />
                        </Link>
                        <Link to='/register' className='short-navigation__link'>Register</Link>
                    </li>
                    <li className='short-navigation__list-item'>
                        <Link to='/' >
                            <img src={helpSvg} alt="help icon" className='short-navigation__icon short-navigation__icon--three' />
                        </Link>
                        <Link to='/' className='short-navigation__link'>Help</Link>
                    </li>
                    <li className='short-navigation__list-item'>
                        <Link to='/' >
                            <img src={aboutSvg} alt="about icon" className='short-navigation__icon short-navigation__icon--four' />
                        </Link>
                        <Link to='/' className='short-navigation__link'>About</Link>
                    </li>
                    <li className='short-navigation__list-item'>
                        <Link to='/credits' >
                            <img src={creditsSvg} alt="credits icon" className='short-navigation__icon short-navigation__icon--four' />
                        </Link>
                        <Link to='/credits' className='short-navigation__link'>Credits</Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default ShortNavBar


/* <li className='short-navigation__list-item'>
    <Link className='short-navigation__icon-link'>
        <img src={} alt="" className='short-navigation__icon' />
    </Link>
    <Link className='short-navigation__link'></Link>
</li> */