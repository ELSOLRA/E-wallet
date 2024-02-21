// import React, { useState, useEffect } from 'react';
// import StoredForms from './StoredForms';
// import NewCard from '../card/NewCard';


// const CardContainer: React.FC = () => {
//   // Tillstånd för att lagra formulärdata
//   const [formData, setFormData] = useState<any>(null);

//   useEffect(() => {
//     // Hämta formulärdata från localStorage och uppdatera tillståndet
//     const storedForms = localStorage.getItem('forms');
//     if (storedForms) {
//       setFormData(JSON.parse(storedForms));
//     }
//   }, []);
//   console.log("FormData from CardContainer:", formData);
//   // Rendera komponenterna
//   return (
//     <div>
//       <StoredForms />
//       {formData && <NewCard formData={formData} />}
//     </div>
//   );
// };

// export default CardContainer;
