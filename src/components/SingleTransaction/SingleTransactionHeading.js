import './SingleTransactionHeading.scss';

function SingleTransactionHeading () {
    return (<>
    <article className="single-transaction__container">
        <p className="single-transaction__text">Date</p>
        <p className="single-transaction__text">Amount</p>
        <p className="single-transaction__text">Paid from/to</p>
        <p className="single-transaction__text">Expense/ Income Account</p>
        <p  className="single-transaction__text single-transaction__text--long">Description</p>
    </article>
    </>)
}

export default SingleTransactionHeading;