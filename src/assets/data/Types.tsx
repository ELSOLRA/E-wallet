export type FormData = {
    id: number;
    vendor: string; 
    cardnumber: string; 
    cardholder: string; 
    validThru: {
      expiremonth: string; 
      expireyear: string; 
      }
    CCV: string
  };