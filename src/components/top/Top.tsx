import React, { useState } from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';




console.log('Top imported')

//Definition av functionell component
const Top: React.FC<{headline: string; cardType: string}> = ({headline, cardType}) => {
    //Definition av useState Hooken och startvärdet
   

    // const gotoAddCard = useNavigate();

    //Function som byter texten när knappen trycks
    // const changeText = () => {
    //     setText('ADD A NEW BANK CARD');
    //     gotoAddCard('/addcard')
    // };
    //Retunera JSX, h1 och button
    return (
        <div>
            <h1 className='top-header'>{headline}</h1>
            <p className='card--type'>{cardType}</p>
        </div>
    );
};

export default Top;










// import { Link } from 'react-router-dom';

// const Top: React.FC = () => {
//     return (
//         <div>
//             <h1 className='top-header'>E-WALLET</h1>
//             <Link to="/add-card">Add a New Bank Card</Link>
//         </div>
//     );
// };

// export default Top;