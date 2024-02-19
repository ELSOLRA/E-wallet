// Button at the bottom of the pages.

//Tsx definition för onclick function/ ? = valfri / void = 
type ButtonProps = { 
    onClick?: () => void;
}

console.log('Button imported')

//Definition av functional component/ dekonstruerad props parameter för att kunna extrahera Button
const Button: React.FC<ButtonProps> = ({ onClick = () => {} }) => {
    return <button className="card-button" onClick={onClick}>ADD A NEW CARD</button>;
}

export default Button;



















// import { Link } from 'react-router-dom';

// const Button: React.FC = () => {
//     return (
//         <Link to="/add-card">ADD A NEW CARD</Link>
//     );
// };

// export default Button;