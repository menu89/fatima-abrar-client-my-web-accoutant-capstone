import './SingleLink.scss';
import {Link} from 'react-router-dom';

function SingleLink ({linkdata}) {
    const {imgSource, altText, linkAdd, linkText, classModifier} = linkdata
    return (
        <>
            <li className='single-link__list-item'>
                <img src={imgSource} alt={altText} className={`single-link__icon single-link__icon${classModifier}`} />
                <Link to={linkAdd} className='single-link__link' >{linkText}</Link>
            </li>
        </>
    )
}

export default SingleLink;