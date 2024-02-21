import vendors from '../../assets/data/vendors'
import './card.scss'

interface FormData {
    id: number;
    cardnumber: string;
    cardHolderName: string;
    validThru: string;
    ccv: string;
    vendor: string;
  }
  
  interface NewCardProps {
    formData: FormData;
}
const NewCard: React.FC<NewCardProps> = ({ formData }) => {
    // Välj vilken vendor du vill använda, t.ex. den första i listan
    const selectedVendor = vendors[4]; 
    return (
        <div className="card--wrapper" style={{backgroundColor: selectedVendor.cardColor}}>
          <div className="card--icons">
            <img className="card--img__chips" src='/src/assets/icons/chip.svg' alt="chip icon" />
            <img className='card--img__icon' src={selectedVendor.icon} alt="Vendor Icon" />
          </div>
          
            <p style={{color: selectedVendor.textColor}}></p>
            <h1 className="card--number">
            </h1>
            <div className="card--info">
                <div className='card--info__top'>
                    <p>CARDHOLDER NAME</p>
                    <p>VALID THRU</p>
                </div>
                <div className='card--info__bottom'>
                <p>{formData && formData.cardHolderName}</p>
                    <p>{formData && formData.validThru}</p>
                </div>
            </div>
        </div>
    );
}

export default NewCard;