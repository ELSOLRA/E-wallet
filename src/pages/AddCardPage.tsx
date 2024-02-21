import Button from "../components/button/Button"
import CardForm from "../components/cardForm/CardForm"
import Top from "../components/top/Top";

const AddCardPage = () => {

  return (
    <div>
      <Top headline='ADD NEW CARD' cardType='NEW CARD'/>
      <CardForm />
      <Button title='ADD CARD' />
    </div>
  )
}

export default AddCardPage