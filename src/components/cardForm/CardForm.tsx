import { useState, ChangeEvent, useEffect } from "react"
import './cardForm.scss'
import ClearLocalStorageButton from "./ClearStorage";
import { FormData } from "../../assets/data/Types";
import Card from "../card/Card";
import { PlaceholderCard } from "../../assets/data/PlaceholderCard";

const vendorList = ['Bitcoin INC', 'Ninja Bank', 'Block Chain INC', 'Evil Corp'];

type Props = {};

const MAX_SUBMISSIONS = 4;

const CardForm: React.FC<Props> = () => {

  const [formData, setFormData] = useState<FormData>({ 
      id: 1,
      cardnumber: "", 
      cardHolderName: "", 
      validThru:"",
      ccv:"",
      vendor:"",
    });

    // const [ccvError, setCcvError] = useState<string | null>(null);
    const [formId, setFormId] = useState<number>(1);
    const [submittedForms, setSubmittedForms] = useState<FormData[]>([]);
    const [duplicatedFormData, setDuplicatedFormData] = useState<FormData | null>(PlaceholderCard);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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

    
    
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {

      const { name, value } = event.target;
      
      
      if (name === 'vendor') {
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        if (name === 'cardnumber') {
          const formattedCardNumber = value.replace(/\D/g, '');  
          setFormData((prevFormData: FormData) => ({ 
            ...prevFormData,
            [name]: formattedCardNumber 
          }));
          setDuplicatedFormData((prevDuplicatedFormData: FormData | null) => ({
            ...prevDuplicatedFormData!,
             [name]: formattedCardNumber, // replace(/(.{4})/g, '$1 '),
          }));
        } else if (name === 'cardHolderName') {
          const formattedCardName = value.replace(/\d/g, '').toUpperCase();
          setFormData((prevFormData: FormData) => ({ 
            ...prevFormData,
            [name]: formattedCardName,
          }));
          setDuplicatedFormData((prevDuplicatedFormData: FormData | null) => ({
            ...prevDuplicatedFormData!,
            [name]: formattedCardName,
          }));
        } else if (name === 'validThru') {
          const formattedValidThru = value.replace(/\D/g, '');
          setFormData((prevFormData: FormData) => ({
            ...prevFormData,
            [name]: formattedValidThru,
          }));
          setDuplicatedFormData((prevDuplicatedFormData: FormData | null) => ({
            ...prevDuplicatedFormData!,
            [name]: formattedValidThru,
          }));
        } else if (name === 'ccv') {
          const formattedCcvNumber = value.replace(/\D/g, '');
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: formattedCcvNumber,
          }));
          setDuplicatedFormData((prevDuplicatedFormData: FormData | null) => ({
            ...prevDuplicatedFormData!,
            [name]: value,
          }));
        } else {
          setFormData((prevFormData: FormData) => ({
            ...prevFormData,
            [name]: value,
          }));
          setDuplicatedFormData((prevDuplicatedFormData: FormData | null) => ({
            ...prevDuplicatedFormData!,
            [name]: value,
          }));
        }
    
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [name]: "",
        }));
      }
    }


function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
  
  event.preventDefault();    // this prevents the default form submission behavior

  if (formData.cardnumber.length !== 16) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      cardnumber: "Card number must be 16 digits",
    }));
    return;
  }

  if (formData.cardHolderName.length < 4) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      cardHolderName: "Firstname with lastname must be between 4 and 25 letters",
    }));
    return;
  }

  const validThruRegex = /^(0[1-9]|1[0-2])(2[2-9]|[3-9][0-9])$/;

  if (!validThruRegex.test(formData.validThru)) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      validThru: "Use MMYY format with valid month and year",
    }));
    return;
  }


  if (formData.ccv.length !== 3) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      ccv: "CCV number must be 3 digits",
    }));
    return;
  }
  
  if (!formData.vendor) {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      vendor: "Please select a vendor",
    }));
    return;
  }

  const numericCcv = Number(formData.ccv);

  const newForm = {
    ...formData,
    ccv: numericCcv,
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
    ccv: "",
    vendor: "",
  }));

   setFormId((prevFormId) => prevFormId + 1);
   
   setDuplicatedFormData(null);
   setFormErrors({});

}

const handleClearLocalStorage = () => {
  setSubmittedForms([]); // Clear submitted forms
};

  return (

    <section className="wrapper">
    

    <Card index={duplicatedFormData} />

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
          maxLength={16}   //maxLength attribute to limit input
        />
        {formErrors.cardnumber && (
              <span className="error-message">{formErrors.cardnumber}</span>
            )}
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
          placeholder="FIRSTNAME LASTNAME"
          maxLength={25}
          
        />
        {formErrors.cardHolderName && (
              <span className="error-message">{formErrors.cardHolderName}</span>
            )}
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
          placeholder="MMYY"
          maxLength={4} 
        />
        {formErrors.validThru && (
              <span className="error-message">{formErrors.validThru}</span>
            )}
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
         {formErrors.ccv && (
              <span className="error-message">{formErrors.ccv}</span>
            )}
      </label>

      <label className="card-form__label" htmlFor="vendor">
          Select a Vendor
          <select
            className="card-form__select"
            name="vendor"
            id="vendor"
            value={formData.vendor}
            onChange={handleChange}
          >
            <option value=""></option>
            {vendorList.map((vendor, index) => (
              <option key={index} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
          {formErrors.vendor && (
              <span className="error-message">{formErrors.vendor}</span>
            )}
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
        <p>Vendor: {form.vendor}</p>
      </div>
    ))}

    <ClearLocalStorageButton onClear={handleClearLocalStorage}/>
  </section>
  )
}

export default CardForm;