import { useState } from "react";
import { PlaceholderCard } from "../assets/data/PlaceholderCard";
import Button from "../components/button/Button";
import Card from "../components/card/Card";
import CardStack from "../components/cardStack/CardStack";
import Top from "../components/top/Top";

const HomePage = () => {
  const data = localStorage.getItem('forms')
  const cards = data ? JSON.parse(data) : [PlaceholderCard];
  const [activeIndex, setActiveIndex] = useState(0);

  const stackedCards = cards.filter((x: any) => {
    return x !== cards[activeIndex];
  });
  
  function changeActive(cardId: number) {
    const newIndex = cards.findIndex((i: number | any) => i.id === cardId);
    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Top headline='E-WALLET'  cardType='ACTIVE CARD' />
      <Card index={cards[activeIndex]}/>
      <CardStack cards={stackedCards} selectCard={changeActive}/>
      <Button title='ADD A NEW CARD'/>
    </div>
  )
}

export default HomePage;

