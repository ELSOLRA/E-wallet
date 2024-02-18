import { useState, ChangeEvent, useEffect } from "react"
import './cardForm.scss'
import ClearLocalStorageButton from "./ClearStorage";

type FormData = {
  id: number;
  cardnumber: string;
  cardHolderName: string;
  validThru: string;
  ccv: number | null;
};

type Props = {};

const MAX_SUBMISSIONS = 4;

const CardForm: React.FC<Props> = (props: Props) => {

  const [formData, setFormData] = useState<FormData>({ 
      id: 1,
      cardnumber: "", 
      cardHolderName: "", 
      validThru:"",
      ccv:null,
    
    });

    const [ccvError, setCcvError] = useState<string | null>(null);
    const [formId, setFormId] = useState<number>(1);
    const [submittedForms, setSubmittedForms] = useState<FormData[]>([]);
    const [duplicatedFormData, setDuplicatedFormData] = useState<FormData | null>(null);
    /* const [submitted, setSubmitted] = useState<boolean>(false); */

    useEffect(() => {
      // Retrieve the last form ID from local storage
      const lastFormId = parseInt(localStorage.getItem('lastFormId') || '0', 10);
      setFormId(lastFormId + 1);
    }, []);

    useEffect(() => {
      const storedForms = localStorage.getItem('forms');
      if (storedForms) {
        const parsedForms: FormData[] = JSON.parse(storedForms);
        setSubmittedForms(parsedForms);
      }
    }, [formId]);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {

      const { name, value } = event.target;

      if (name === 'ccv') {
        if (/^\d+$/.test(value)) {
          const numericValue = Number(value) ; //  or parseInt(value, 10)
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: numericValue,
          }));
          setCcvError(null); // Clear error 
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: null,
          }));
          setCcvError("Only numbers are allowed (maximum 3 digits)");
        }
        
      } else if (name === 'cardnumber') {

        const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ');  // we can use .slice(0, 19) if we don't have maxLength={16} on input   
        setFormData((prevFormData) => ({ 
          ...prevFormData,
           [name]: formattedCardNumber 
        }));
        setDuplicatedFormData({ ...formData, [name]: formattedCardNumber });
      } else {

      setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  setDuplicatedFormData({ ...formData, [name]: value });
}



function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
  
  event.preventDefault();    // this prevents the default form submission behavior
  
  const newForm = {
    ...formData,
    id: formId,
  };

  console.log('Form submitted!', newForm);

  const storedForms = localStorage.getItem('forms');
  const forms: FormData[] = storedForms ? JSON.parse(storedForms) : [];
  const updatedForms = [...forms, newForm].slice(-MAX_SUBMISSIONS);   // -MAX_SUBMISSIONS negative index,  includes the last 4 elements (MAX_SUBMISSIONS=4)
  localStorage.setItem('forms', JSON.stringify(updatedForms));
  console.log('Saved to local storage:', updatedForms);

  /* setSubmitted(true); */
  localStorage.setItem('lastFormId', String(formId));
  // using this to clear the form data for the next submission
  setFormData((prevFormData) => ({
    ...prevFormData,
    id: formId + 1,
    cardnumber: "",
    cardHolderName: "",
    validThru: "",
    ccv: null,
  }));

   setFormId((prevFormId) => prevFormId + 1);
}

/* function formatCardNumber(cardNumber: string): string {
  const formattedNumber = cardNumber.replace(/(.{4})/g, '$1 ');
  return formattedNumber.trim();
} */

  return (

    <section className="wrapper">
    

    {duplicatedFormData && (
        <section className="card-data">
          <p>Card Data:</p>
          <p className="card__item card__item--number">Card Number: {duplicatedFormData.cardnumber}</p>
          <p className="card__item card__item--holder">Card Holder Name: {duplicatedFormData.cardHolderName}</p>
          <p className="card__item card__item--valid-thru">Valid Thru: {duplicatedFormData.validThru}</p>
          <p className="card__item card__item--ccv">CCV: {duplicatedFormData.ccv}</p>
        </section>
      )}

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
          maxLength={19}      //maxLength attribute to limit input
        />
      </label>
      <label className="card-form__label" htmlFor="cardHolderName">
        Card Holder Name
        <input
          className="card-form__input"
          type="text"
          name="cardHolderName"
          id="cardHolderName"                 //  this id is used to connect the label and input
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
          type="tel"    // type="tel" for a numeric input field on mobile
          name="ccv"
          id="ccv"
          value={formData.ccv === null ? '' : String(formData.ccv)}
          onChange={handleChange}
          maxLength={3} 
        />
        {ccvError && <span className="error-message">{ccvError}</span>}
      </label>
      <button className="card-form__submit" type="submit">
        Submit this!
      </button>

    </form>

    {submittedForms.map((form) => (
      <div key={form.id}>
        <p>ID: {form.id}</p>
        <p>Card Number: {form.cardnumber}</p>
        <p>Card Holder Name: {form.cardHolderName}</p>
        <p>Valid Thru: {form.validThru}</p>
        <p>CCV: {form.ccv}</p>
      </div>
    ))}

    <ClearLocalStorageButton />
  </section>
  )
}

export default CardForm;