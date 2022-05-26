import './DisplayFieldTwo.scss';

function DisplayFieldTwo ({objectClass, one, two, three, four}) {
    return (
        <div className={objectClass}>
            <p className='display-four__content'>{one}</p>
            <p className='display-four__content'>{two}</p>
            <p className='display-four__content'>{three}</p>
            <p className='display-four__content display-four__content--end'>{four}</p>
        </div>
    )
}

export default DisplayFieldTwo;