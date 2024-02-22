import { vendors } from '../../assets/data/vendors';
import { FormData } from '../../assets/data/Types';
import './card.scss'

export interface CardDisplayProps {
    cardData: FormData | null;
    selectedVendor?: string;
}

const Card: React.FC<CardDisplayProps> = ({ cardData, selectedVendor }) => {
    const vendorInfo = selectedVendor
    ? vendors.find((vendor) => vendor.name === selectedVendor) || { cardColor: '', icon: '', textColor: '' }
    : { cardColor: '', icon: '', textColor: ''};
  const { cardColor, icon, textColor } = vendorInfo;

  return (
    <div className="card-wrapper" style={{ backgroundColor: selectedVendor ? cardColor || '' : '' , color: selectedVendor ? textColor || '' : '' }}>
      <div className="card-icons">
        <img className="card-icons__chips" src='/src/assets/icons/chip.svg' alt="chip icon" />
        <img className='card-icons__icon' src={icon || './src/assets/icons/cryptocurrency.svg'} alt="vendor icon" />
      </div>
      <h1 className="card-number">
      {cardData
          ? String(cardData.cardnumber)             // must remake string for card number!!!
              .padEnd(16, 'X')
              .replace(/(.{4})/g, '$1 ')
          : 'XXXX XXXX XXXX XXXX'}
      </h1>

      <div className="card-info">
        <div className='card-info__top'>
          <p>CARDHOLDER NAME</p>
          <p>VALID THRU</p>
        </div>
        <div className='card-info__bottom'>
          <p>{cardData?.cardholder? cardData.cardholder : 'FIRSTNAME LASTNAME'}</p>
          <p>
            {cardData?.validThru.expiremonth || cardData?.validThru.expireyear? 
            `${cardData?.validThru.expiremonth}/${cardData?.validThru.expireyear || 'YY'}`: 'MM/YY'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;