
import vendors from '../../assets/data/vendors'; 
import { FormData } from './CardForm';


interface CardDisplayProps {
    cardData: FormData | null;
    selectedVendor: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cardData, selectedVendor }) => {
    const vendorInfo = selectedVendor
    ? vendors.find((vendor) => vendor.name === selectedVendor) || { cardColor: '', icon: '' }
    : { cardColor: '', icon: '' };
  const { cardColor, icon } = vendorInfo;

  return (
    <div className="card--wrapper" style={{ backgroundColor: selectedVendor ? cardColor || '' : '' }}>
      <div className="card--icons">
        <img className="card--img__chips" src='/src/assets/icons/chip.svg' alt="chip icon" />
        <img className='card--img__icon' src={icon || './src/assets/icons/cryptocurrency.svg'} alt="vendor icon" />
      </div>
      <h1 className="card--number">
      {cardData
          ? String(cardData.cardnumber)             // must remake string for card number!!!
              .padEnd(16, 'X')
              .replace(/(.{4})/g, '$1 ')
          : 'XXXX XXXX XXXX XXXX'}
      </h1>

      <div className="card--info">
        <div className='card--info__top'>
          <p>CARDHOLDER NAME</p>
          <p>VALID THRU</p>
        </div>
        <div className='card--info__bottom'>
          <p>{cardData ? cardData.cardHolderName : 'FIRSTNAME LASTNAME'}</p>
          <p>{cardData && cardData.validThru ? cardData.validThru.replace(/(\d{2})(\d{2})/, '$1/$2') : 'MM/YY'}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;