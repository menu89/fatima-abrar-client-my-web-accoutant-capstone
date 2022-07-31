import './NavBar.scss';
import SingleLink from './SingleLink';
import listSvg from '../../assets/icon/list.svg';
import loginSvg from '../../assets/icon/login.svg';
import registrationSvg from '../../assets/icon/registration.svg';
import helpSvg from '../../assets/icon/help.svg';
import aboutSvg from '../../assets/icon/about.svg';
import creditsSvg from '../../assets/icon/clipboard.svg';
import navProps from '../../assets/navigationProps.json';

function ShortNavBar () {
    const propsArray =[
        {imgSource:loginSvg, classModifier:'--one', ...navProps.logInNav},
        {imgSource:registrationSvg, classModifier:'--two', ...navProps.registerNav},
        {imgSource:helpSvg, classModifier:'--three', ...navProps.helpNav},
        {imgSource:aboutSvg, classModifier:'--four', ...navProps.aboutUsNav},
        {imgSource:creditsSvg, classModifier:'--five', ...navProps.creditsNav}
    ]
    return (
        <>
        <header className='heading'>
            <img src={listSvg} alt="list icon" className='heading__icon' />
            <nav className='navigation'>
                <ul className='navigation__list'>
                    {propsArray.map((oneLink, linkIndex) => {
                        return <SingleLink linkdata={oneLink} key={linkIndex} />
                    })}
                </ul>
            </nav>
        </header>
        </>
    )
}

export default ShortNavBar
