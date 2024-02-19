import './card.scss'
import vendors from '../../assets/data/vendors'
import Cards from '../../assets/data/StoreCards'

const Card = ({ index }: any) => {

    const myCard = Cards[index]
    const myVendor: any = vendors.find(({ name }) => name === myCard.vendor)

    return (
        <div className="card--wrapper" style={{backgroundColor: `${myVendor.cardColor}`}}>
            <div className="card--icons">
                <img className="card--img__chips" src='/src/assets/icons/chip.svg' alt="chip icon" />
                <img className='card--img__icon' src={`${myVendor.icon}`} />
            </div>
            <h1 className="card--number">{
            `${myCard.number[0]}${myCard.number[1]}${myCard.number[2]}${myCard.number[3]} 
            ${myCard.number[4]}${myCard.number[5]}${myCard.number[6]}${myCard.number[7]} 
            ${myCard.number[8]}${myCard.number[9]}${myCard.number[10]}${myCard.number[11]} 
            ${myCard.number[12]}${myCard.number[13]}${myCard.number[14]}${myCard.number[15]}`
            }</h1>
            <div className="card--info">
                <div className='card--info__top'>
                    <p>CARDHOLDER NAME</p>
                    <p>VALID THRU</p>
                </div>
                <div className='card--info__bottom'>
                    <p>{myCard.firstName} {myCard.lastName}</p>
                    <p>{myCard.valid}</p>
                </div>
            </div>
        </div>
    )
}

export default Card