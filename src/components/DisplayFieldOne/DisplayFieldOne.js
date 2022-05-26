import './DisplayFieldOne.scss';

function DisplayFieldOne ({objectClass, one, two, three}) {
    return (
        <div className={objectClass}>
            <p className='display-three__content'>{one}</p>
            <p className='display-three__content'>{two}</p>
            <p className='display-three__content display-three__content--end'>{three}</p>
        </div>
    )
}

export default DisplayFieldOne;