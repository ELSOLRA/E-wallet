import { PlaceholderCard } from "../assets/data/PlaceholderCard";
import Button from "../components/button/Button";
import Card from "../components/card/Card";
import CardStack from "../components/cardStack/CardStack";
import Top from "../components/top/Top";

const HomePage = () => {
  const data = localStorage.getItem('forms')
  const cards = data ? JSON.parse(data) : [PlaceholderCard];

  return (
    <div>
      <Top headline='E-WALLET'  cardType='ACTIVE CARD' />
      <Card index={cards[0]}/>
      <CardStack cards={cards}/>
      <Button title='ADD A NEW CARD'/>
    </div>
  )
}

export default HomePage;