// Button at the bottom of the pages.
import { useNavigate } from "react-router-dom";

//Tsx definition för onclick function/ ? = valfri / void = 

//Definition av functional component/ dekonstruerad props parameter för att kunna extrahera Button
const Button: React.FC<{title: string}> = ({title}) => {
    
    const gotoAddCard = useNavigate();

    //Function som byter texten när knappen trycks
    const changeText = () => {
        
        gotoAddCard('/addcard')
    };
    return <button className="card-button" onClick={changeText}>{title}</button>;
}

export default Button;