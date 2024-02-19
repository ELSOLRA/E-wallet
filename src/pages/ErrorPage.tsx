import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import "./pageStyling.scss"

// ~~ Errorpage ~~
// Display the relevant information on screen. show the full error information in console. And offers a link back to the homepage.
const ErrorPage = () => {

  const error: any = useRouteError();
  console.log(error);

  return (
    <div className="error--liner">
      <div className="error--wrapper__big">
        <h2 className="error--headline">We ran into a problem!</h2>
        <div className="error--wrapper__small">
          <p className="error--code">{error.status}</p>
          <h1 className="error--type">- {error.statusText} -</h1>
        </div>
        <Link className="error--return" to='/'>Take me back to homepage!</Link>
        <br />
        <img className="error-img" src="src/assets/errorflame.svg" alt="computer set a flame" />
        <p className="error--message">- {error.data} -</p>
      </div>
    </div>
  )
}

export default ErrorPage