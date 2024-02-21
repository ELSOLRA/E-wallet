// Button at the bottom of the pages.
import { useNavigate } from "react-router-dom";

const Button: React.FC<{title: string}> = ({title}) => {
    
    const gotoAddCard = useNavigate();
    const changeText = () => {  
        gotoAddCard('/addcard')
    };

    return <button className="card-button" onClick={changeText}>{title}</button>;
}

export default Button;