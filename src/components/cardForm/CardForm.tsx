import { useState, ChangeEvent } from "react"
import './cardForm.scss'

type FormData = {
  cardnumber: string;
  cardHolderName: string;
  validThru: string;
  ccv: string;
};

type Props = {};

const CardForm: React.FC<Props> = (props: Props) => {

  const [formData, setFormData] = useState<FormData>(
    { cardnumber: "", 
      cardHolderName: "", 
      validThru:"",
      ccv:"",
    
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {

      const { name, value } = event.target;

      setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {

      event.preventDefault(); // this prevents the default form submission behavior
      console.log('Form submitted!', formData);
    }

  return (
    <form className="card-form" action="" onSubmit={handleSubmit}>
      <label className="card-form__label" htmlFor="cardnumber">
        Card number
        <input
          className="card-form__input"
          type="text"
          name="cardnumber"
          id="cardnumber"
          value={formData.cardnumber}
          onChange={handleChange}
        />
      </label>
      <label className="card-form__label" htmlFor="cardHolderName">
        Card Holder Name
        <input
          className="card-form__input"
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          value={formData.cardHolderName}
          onChange={handleChange}
        />
      </label>
      <label className="card-form__label" htmlFor="validThru">
        Valid thru
        <input
          className="card-form__input"
          type="text"
          name="validThru"
          id="validThru"
          value={formData.validThru}
          onChange={handleChange}
          placeholder="MM/YY"
        />
      </label>
      <label className="card-form__label" htmlFor="ccv">
        CCV
        <input
          className="card-form__input"
          type="text"
          name="ccv"
          id="ccv"
          value={formData.ccv}
          onChange={handleChange}
          
        />
      </label>
      <button className="card-form__submit" type="submit">
        Submit this!
      </button>


    </form>

  )
}

export default CardForm;