import './card.scss'
import vendors from '../../assets/data/vendors'

const Card: React.FC<{index: any}>  = ({ index }) => {

    const myCard = index
    const myVendor: any = vendors.find(({ name }) => name === myCard.vendor) 

    return (
        <div className="card--wrapper" style={{backgroundColor: `${myVendor.cardColor}`}}>
            <div className="card--icons">
                <img className="card--img__chips" src='/src/assets/icons/chip.svg' alt="chip icon" />
                <img className='card--img__icon' src={`${myVendor.icon}`} />
            </div>
            <h1 className="card--number">{myCard.cardnumber.replace(/(.{4})/g, '$1 ')}</h1>
            <div className="card--info">
                <div className='card--info__top'>
                    <p>CARDHOLDER NAME</p>
                    <p>VALID THRU</p>
                </div>
                <div className='card--info__bottom'>
                    <p>{myCard.cardholder}</p>
                    <p>{myCard.validThru.expiremonth}/{myCard.validThru.expireyear}</p>
                </div>
            </div>
        </div>
    )
}

export default Card