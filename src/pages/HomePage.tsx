import Button from "../components/button/Button";
import Card from "../components/card/Card";
// import CardStack from "../components/cardStack/CardStack";
import Top from "../components/top/Top";


const HomePage = () => {
  return (
    <div>
      <Top headline='E-WALLET'  cardType='ACTIVE CARD' />
      <Card index={0}/>
      {/* <CardStack /> */}
      <Button title='ADD A NEW CARD'/>
    </div>
  )
}

export default HomePage;
