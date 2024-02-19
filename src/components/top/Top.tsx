import React, { useState } from 'react';
import Button from '../button/Button';

console.log('Top imported')

//Definition av functionell component
const Top: React.FC = () => {
    //Definition av useState Hooken och startvärdet
    const [text, setText] = useState('E-WALLET');

    //Function som byter texten när knappen trycks
    const changeText = () => {
        setText('ADD A NEW BANK CARD');
    };
    //Retunera JSX, h1 och button
    return (
       <>
            <h1 className='top-header'>{text}</h1>
            <Button onClick={changeText} />
            </>
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