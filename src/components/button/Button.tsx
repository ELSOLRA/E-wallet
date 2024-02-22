import './button.scss'
import { useNavigate } from "react-router-dom";

const Button: React.FC<{title: string}> = ({title}) => {
    
    const gotoAddCard = useNavigate();
    const changeText = () => {  
        gotoAddCard('/addcard')
    };

    return <button className="card-button card-button--btncolor " onClick={changeText}>{title}</button>;
}

export default Button;