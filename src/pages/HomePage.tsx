import Card from "../components/card/Card";
import { Link } from "react-router-dom";
import StoredForms from "../components/cardForm/StoredForms";

const HomePage = () => {
  return (
    <div>homepage
    <button>
      <Link to="/add-card"> Add-cart </Link>
    </button>
      < Card index={0}/>
      < StoredForms />
    </div>
  )
}

export default HomePage;
