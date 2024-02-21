import { useState, ChangeEvent, useEffect } from "react"
import './cardForm.scss'
import ClearLocalStorageButton from "./ClearStorage";
import { FormData } from "../../assets/data/Types";
import vendors from "../../assets/data/vendors";
import Card from "../card/Card";
import { useNavigate } from "react-router";

const MAX_SUBMISSIONS = 4;

const CardForm: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    id: 1,
    vendor: '',
    cardnumber: '',
    cardholder: '',
    validThru: {
      expiremonth: '',
      expireyear: ''
    },
    CCV: ''
  });


  const [formId, setFormId] = useState<number>(1);
  const [submittedForms, setSubmittedForms] = useState<FormData[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedVendor, setSelectedVendor] = useState<string>('');

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
      console.log('forms in storage - ', storedForms)
    }
  }, [formId]);


  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {

    const { name, value } = event.target;


    if (name === 'vendor') {
      //   Updating only the vendor property in the form data
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setSelectedVendor(value);
    } else {
      if (name === 'cardnumber') {
        const formattedCardNumber = value.replace(/\D/g, '');
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name]: formattedCardNumber
        }));

      } else if (name === 'cardholder') {
        const formattedCardName = value.replace(/\d/g, '').toUpperCase();
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name]: formattedCardName,
        }));

      } else if (name === 'validThru') {
        const formattedValidThru = value.replace(/\D/g, '');

        const expiremonth = formattedValidThru.slice(0, 2);
        const expireyear = formattedValidThru.slice(2);

        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name]: { expiremonth, expireyear },
        }));

      } else if (name === 'CCV') {
        const formattedCcvNumber = value.replace(/\D/g, '');
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedCcvNumber,
        }));

      } else {
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
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

    if (formData.cardholder.length < 4) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        cardholder: "Firstname with lastname must be between 4 and 25 letters",
      }));
      return;
    }

    const validThruRegex = /^(0[1-9]|1[0-2])(2[2-9]|[3-9][0-9])$/;

    if (!validThruRegex.test(`${formData.validThru.expiremonth}${formData.validThru.expireyear}`)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        validThru: "Use MMYY format with valid expiremonth and expireyear",
      }));
      return;
    }

    if (formData.CCV.length !== 3) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        CCV: "CCV number must be 3 digits",
      }));
      return;
    }

    if (!formData.vendor) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        vendor: "Please select vendor",
      }));
      return;
    }


    const numericCcv = Number(formData.CCV);

    const newForm = {
      ...formData,
      CCV: numericCcv,
      id: formId,
    };

    console.log('Form submitted!', newForm);

    const storedForms = localStorage.getItem('forms');
    const forms: FormData[] = storedForms ? JSON.parse(storedForms) : [];
    const updatedForms = [...forms, newForm].slice(-MAX_SUBMISSIONS);   // -MAX_SUBMISSIONS negative index,  includes the last 4 elements (MAX_SUBMISSIONS=4)
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    console.log('Saved to local storage:', updatedForms);


    localStorage.setItem('lastFormId', String(formId));
    // using this to clear the form data for the next submission
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: formId + 1,
      cardnumber: "",
      cardholder: "",
      validThru: {
        expiremonth: "",
        expireyear: "",
      },
      CCV: "",
      vendor: "",
    }));

   setFormId((prevFormId) => prevFormId + 1);
   setFormErrors({});
   gotoHomePage('/')
}

  const handleClearLocalStorage = () => {
    setSubmittedForms([]); // Clear submitted forms
  };


const gotoHomePage = useNavigate();



  return (

    <section className="wrapper">

      <Card cardData={formData} selectedVendor={selectedVendor} />

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
        <label className="card-form__label" htmlFor="cardholder">
          Card Holder Name
          <input
            className="card-form__input"
            type="text"
            name="cardholder"
            id="cardHolderName"                 //  this id is used to connect the label and input
            value={formData.cardholder}
            onChange={handleChange}
            placeholder="FIRSTNAME LASTNAME"
            maxLength={25}

          />
          {formErrors.cardholder && (
            <span className="error-message">{formErrors.cardholder}</span>
          )}
        </label>
        <label className="card-form__label" htmlFor="validThru">
          Valid thru
          <input
            className="card-form__input"
            type="text"
            name="validThru"
            id="validThru"
            value={`${formData.validThru.expiremonth}${formData.validThru.expireyear}`}
            onChange={handleChange}
            placeholder="MMYY"
            maxLength={4}
          />
          {formErrors.validThru && (
            <span className="error-message">{formErrors.validThru}</span>
          )}
        </label>
        <label className="card-form__label" htmlFor="CCV">
          CCV
          <input
            className="card-form__input"
            type="tel"    // type="tel" for a numeric input field on mobile
            name="CCV"
            id="ccv"
            value={formData.CCV}
            onChange={handleChange}
            maxLength={3}
          />
          {formErrors.CCV && (
            <span className="error-message">{formErrors.CCV}</span>
          )}
        </label>

        <label className="card-form__label" htmlFor="vendor">
          Select a Vendor
          <select
            className="card-form__select"
            name="vendor"
            id="vendor"
            value={selectedVendor}
            onChange={handleChange}
          >
            <option value=""></option>
            {vendors.map((vendor, index) => (
              <option key={index} value={vendor.name}>
                {vendor.name}
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
          <p>Card Holder Name: {form.cardholder}</p>
          <p>Valid Thru: {`${formData.validThru.expiremonth}${formData.validThru.expireyear}`}</p>
          <p>CCV: {form.CCV}</p>
          <p>Vendor: {form.vendor}</p>
        </div>
      ))}

      <ClearLocalStorageButton onClear={handleClearLocalStorage} />
    </section>
  )
}

export default CardForm;