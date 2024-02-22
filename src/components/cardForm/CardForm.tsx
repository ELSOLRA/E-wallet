import { useState, ChangeEvent, useEffect } from "react"
import './cardForm.scss'
import { FormData } from "../../assets/data/Types";
import { vendors } from "../../assets/data/vendors";
import Card from "../card/Card";
import { useNavigate } from "react-router";
import FormField from "./FormField";

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the last form ID from local storage
    const lastFormId = parseInt(localStorage.getItem('lastFormId') || '0', 10);
    setFormId(lastFormId + 1);
  }, []);

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
      let formattedValue: string | { expiremonth: string; expireyear: string } = value;

      switch (name) {
        case 'cardnumber':
          formattedValue = value.replace(/\D/g, '');
          break;

        case 'cardholder':
          formattedValue = value.replace(/\d/g, '').toUpperCase();
          break;

        case 'validThru':
          const formattedValidThru = value.replace(/\D/g, '');
          const expiremonth = formattedValidThru.slice(0, 2);
          const expireyear = formattedValidThru.slice(2);
          formattedValue = { expiremonth, expireyear };
          break;

        case 'CCV':
          formattedValue = value.replace(/\D/g, '');
          break;

        default:
          break;
      }

      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));

      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [name]: "",
      }));
    }
  };

  const handleFormSubmission = (): void => {
    gotoHomePage('/');
  };

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
        cardholder: "Firstname with lastname must be between from 4 to 25 letters",
      }));
      return;
    }

    const validThruRegex = /^(0[1-9]|1[0-2])(2[2-9]|[3-9][0-9])$/;

    if (!validThruRegex.test(`${formData.validThru.expiremonth}${formData.validThru.expireyear}`)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        validThru: "Use MMYY format with valid month and year",
      }));
      return;
    }

    if (typeof formData.CCV !== 'string' || formData.CCV.length !== 3) {
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

    if (formData.CCV.length !== 3) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        CCV: "CCV number must be 3 digits",
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

    const storedForms = JSON.parse(localStorage.getItem('forms') || '[]');

    if (typeof newForm.CCV === 'number' && String(newForm.CCV).length !== 3) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        CCV: "CCV number must be 3 digits",
      }));
      return;
    }

    if (storedForms.length === MAX_SUBMISSIONS) {
      setConfirmationMessage("You already have 4 cards. Remove an existing one before adding a new card.");

    } else {
    const updatedForms = [...storedForms, newForm].slice(-MAX_SUBMISSIONS);
    localStorage.setItem('forms', JSON.stringify(updatedForms));   // -MAX_SUBMISSIONS negative index,  includes the last 4 elements (MAX_SUBMISSIONS=4)
    console.log('Saved to local storage:', updatedForms);
    localStorage.setItem('lastFormId', String(formId));

    // using this to clear the form data for the next submission
    setFormData((prevFormData) => ({ ...prevFormData, id: formId + 1, cardnumber: "", cardholder: "", validThru: { expiremonth: "", expireyear: "" }, CCV: "", vendor: "" }));
    setFormId((prevFormId) => prevFormId + 1);
    setFormErrors({});
    handleFormSubmission()
    }
}
  const gotoHomePage = useNavigate();

  return (

    <section className="form-container">

      <Card cardData={formData} selectedVendor={selectedVendor} />

      {confirmationMessage && (
        <section className="confirmation-message">
          <p>{confirmationMessage}</p>
          <section className="confirmation-buttons">
            <button onClick={() => { setConfirmationMessage(null); handleFormSubmission() }}>ACCEPT</button>
            <button onClick={() => setConfirmationMessage(null)}>CANCEL</button>
          </section>
        </section>
      )}

      <form className="card-form" action="" onSubmit={handleSubmit}>
        <FormField
          label="Card number"
          name="cardnumber"
          type="text"
          value={formData.cardnumber}
          onChange={handleChange}
          error={formErrors.cardnumber}
          maxLength={16}
        />
        <FormField
          label="Card Holder Name"
          name="cardholder"
          type="text"
          value={formData.cardholder}
          onChange={handleChange}
          error={formErrors.cardholder}
          placeholder="FIRSTNAME LASTNAME"
          maxLength={25}
        />
        <section className="card-form__items-containers">
        <FormField
          label="Valid thru"
          name="validThru"
          type="text"
          value={`${formData.validThru.expiremonth}${formData.validThru.expireyear}`}
          onChange={handleChange}
          error={formErrors.validThru}
          placeholder="MMYY"
          maxLength={4}
        />
        <FormField
          label="CCV"
          name="CCV"
          type="tel"
          value={formData.CCV}
          onChange={handleChange}
          error={formErrors.CCV}
          maxLength={3}
        />
        </section>
        <FormField
          label="Vendor"
          name="vendor"
          type="select"
          value={selectedVendor}
          onChange={handleChange}
          error={formErrors.vendor}
          options={vendors.map((vendor) => ({
            value: vendor.name,
            label: vendor.name,
          }))}
        />

        <button className="add-card-btn" type="submit">
          ADD card
        </button>

      </form>
    </section>
  )
}

export default CardForm;