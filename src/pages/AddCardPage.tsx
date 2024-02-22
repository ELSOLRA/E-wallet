import CardForm from "../components/cardForm/CardForm"
import Top from "../components/top/Top";
import './pageStyling.scss'

const AddCardPage = () => {

  return (
    <section className="wrapper">
      <Top headline='ADD A NEW BANK CARD' cardType='NEW CARD'/>
      <CardForm />
    </section>
  )
}
export default AddCardPage