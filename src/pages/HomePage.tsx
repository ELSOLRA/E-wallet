import { Link } from "react-router-dom";
import Top from "../components/top/Top";


const HomePage = () => {
  return (
    <div>homepage
    <button>
    <Link to="/add-card"> Add-cart </Link>
    <Top />
    </button>
    </div>
  )
}

export default HomePage;
