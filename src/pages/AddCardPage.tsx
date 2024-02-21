import CardForm from "../components/cardForm/CardForm"
import Top from "../components/top/Top";

const AddCardPage = () => {

  return (
    <div>
      <Top headline='ADD NEW CARD' cardType='NEW CARD'/>
      <CardForm />
    </div>
  )
}

export default AddCardPage