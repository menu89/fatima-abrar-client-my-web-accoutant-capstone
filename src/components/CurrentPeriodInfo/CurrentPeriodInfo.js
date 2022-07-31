import './CurrentPeriodInfo.scss';

function CurrentPeriodInfo ({periodProps}) {
    const {openingBalances, openingTotal, currentPeriod, incomeDiff, expenseDiff} = periodProps
    const {cash, chequeing, savings } = openingBalances
    const creditCard = openingBalances['credit-card']
    const lineOfCredit = openingBalances['line-of-credit']

    const periodDate = new Date(currentPeriod.startDate)
    const periodArray = periodDate.toDateString().split(' ')
    const periodString = `${periodArray[1]} ${periodArray[3]}`

    const adjustedTotal = openingTotal - incomeDiff - expenseDiff

    return (<>
    <p>Current Period: {periodString}</p>
    <details className="balances-container">
        <p className="balances-container__content">
            Cash: 
            <span className='balances-container__amount'>{Intl.NumberFormat().format(cash)}</span>
        </p>
        <p className="balances-container__content">
            Chequeing: 
            <span className='balances-container__amount'>{Intl.NumberFormat().format(chequeing)}</span>
        </p>
        <p className="balances-container__content">
            Credit Cards: 
            <span className='balances-container__amount'>{Intl.NumberFormat().format(creditCard)}</span>
        </p>
        <p className="balances-container__content">
            Line of Credit: 
            <span className='balances-container__amount'>{Intl.NumberFormat().format(lineOfCredit)}</span>
        </p>
        <p className="balances-container__content">
            Savings: 
            <span className='balances-container__amount'>{Intl.NumberFormat().format(savings)}</span>
        </p>
        <summary>
            Total Current Balance: 
            <span className='balances-container--total'>{Intl.NumberFormat().format (openingTotal)}</span>
        </summary>
    </details>

    <details className='balances-container'>
        <p className="balances-container__content">
            Budgeted Income:
            <span className='balances-container__amount'>{Intl.NumberFormat().format(-currentPeriod['budget_income'])}</span>
        </p>
        <p className="balances-container__content">
            Current Period Actual:
            <span className='balances-container__amount'>{Intl.NumberFormat().format(-currentPeriod['actual_income'])}</span>
        </p>
        <summary>
            Add: Expected Income:
            <span className='balances-container--total'>{Intl.NumberFormat().format(-incomeDiff)}</span>
        </summary>
    </details>

    <details className='balances-container'>
        <p className="balances-container__content">
            Budgeted Expenses:
            <span className='balances-container__amount'>{Intl.NumberFormat().format(currentPeriod['budget_expense'])}</span>
        </p>
        <p className="balances-container__content">
            Current Period Actual:
            <span className='balances-container__amount'>{Intl.NumberFormat().format(currentPeriod['actual_expense'])}</span>
        </p>
        <summary>
            Less: Expected Expenses:
            <span className='balances-container--total'>{Intl.NumberFormat().format(-expenseDiff)}</span>
        </summary>
    </details>
    <p>
        Adjusted Total: 
        <span className='balances-container--adjusted-total'> {Intl.NumberFormat().format(adjustedTotal)}</span>
    </p>
    </>)
}

export default CurrentPeriodInfo;