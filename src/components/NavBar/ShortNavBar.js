import './NavBar.scss';
import SingleLink from './SingleLink';
import listSvg from '../../assets/icon/list.svg';
import loginSvg from '../../assets/icon/login.svg';
import registrationSvg from '../../assets/icon/registration.svg';
import helpSvg from '../../assets/icon/help.svg';
import aboutSvg from '../../assets/icon/about.svg';
import creditsSvg from '../../assets/icon/clipboard.svg';

function ShortNavBar () {
    const propsArray =[
        {imgSource:loginSvg, altText:'log in icon', linkAdd:'/', linkText:'Log In', classModifier:'--one'},
        {imgSource:registrationSvg, altText:'registration icon', linkAdd:'/register', linkText:'Register', classModifier:'--two'},
        {imgSource:helpSvg, altText:'help icon', linkAdd:'/', linkText:'Help', classModifier:'--three'},
        {imgSource:aboutSvg, altText:'about icon', linkAdd:'/', linkText:'About Us', classModifier:'--four'},
        {imgSource:creditsSvg, altText:'credits icon', linkAdd:'/credits', linkText:'Credits', classModifier:'--five'}
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
