import Card from "../components/card/Card";
import { Link } from "react-router-dom";
import Top from "../components/top/Top";


const HomePage = () => {
  return (
    <div>homepage
    <button>
    <Link to="/add-card"> Add-cart </Link>
    <Top />
    </button>
      < Card index={0}/>
    </div>
  )
}

export default HomePage;
