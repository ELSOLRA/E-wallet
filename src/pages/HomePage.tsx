import Card from "../components/card/Card";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>homepage
    <button>
      <Link to="/addcard"> Add-cart </Link>
    </button>
      < Card index={0}/>
    </div>
  )
}

export default HomePage;
