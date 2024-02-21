import NewCard from "../card/NewCard";
//Skapar en funktionell komponent
const StoredForms: React.FC = () => {
  
    // Hämta den sparade formulärdatan från localStorage med getItem med nyckeln forms
    const storedForms = localStorage.getItem("forms");
    //Ta datan från localstorage till en array av formdataObject, om det finns data- tas det fån JSON.parse, annars retuneras en tom array
    const parsedForms: FormData[] = storedForms ? JSON.parse(storedForms) : [];
    //TS definition av datan
    type FormData = {
        id: number;
        cardnumber: string;
        cardHolderName: string;
        validThru: string;
        ccv: string;
        vendor: string;
      };
      //Retunera JSX. Loopa igenom med map
    return (
      <div>
        <ul>
          {parsedForms.map((form, index) => (
            <li key={index}>
              <NewCard formData={form} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StoredForms;
  