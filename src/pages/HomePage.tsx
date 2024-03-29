import { useState } from "react";
import { PlaceholderCard } from "../assets/data/PlaceholderCard";
import Button from "../components/button/Button";
import Card from "../components/card/Card";
import CardStack from "../components/cardStack/CardStack";
import Top from "../components/top/Top";
import { Novendor,vendors } from "../assets/data/vendors";
import '../components/cardStack/cardStack.scss'

import ClearLocalStorageButton from "../components/cardForm/ClearStorage";

const HomePage = () => {
  const data = localStorage.getItem('forms')
  const initialCards = data ? JSON.parse(data) : [PlaceholderCard];
  const [cards, setCards] = useState(initialCards);
  const [activeIndex, setActiveIndex] = useState(0);
  

  const stackedCards = cards.filter((x: any) => {
    return x !== cards[activeIndex];
  });
  
  function changeActive(cardId: number) {
    const newIndex = cards.findIndex((i: number | any) => i.id === cardId);
    setActiveIndex(newIndex);
  }
  const myVendor: any = vendors.find(({ name }) => name === cards[activeIndex]?.vendor) 
  ? vendors.find(({ name }) => name === cards[activeIndex]?.vendor) 
  : {Novendor}

  const clearLocalStorage = () => {
    
    const updatedForms = cards.filter((card: any) => card !== cards[activeIndex]);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    
    setActiveIndex(0);  
    const updatedCards = updatedForms.length > 0 ? updatedForms : [PlaceholderCard];
    setCards(updatedCards);
  };

  return (
    <section className="wrapper">
      <Top headline='E-WALLET'  cardType='ACTIVE CARD' />
      <Card cardData={cards[activeIndex]} selectedVendor={myVendor.name} /> 
      <ClearLocalStorageButton onClear={clearLocalStorage} />
      <CardStack cards={stackedCards} selectCard={changeActive}/>
      <Button title='ADD A NEW CARD'/>
    </section>
  )
}

export default HomePage;

