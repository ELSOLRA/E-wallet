import './cardStack.scss'
import Card from '../card/Card';


const CardStack: React.FC<{cards: Array<Object>; selectCard: Function}> = ({ cards, selectCard }) => {
   

    return (
        <section className='card-stack'>
            {/* Använd map för att loopa igenom parsedForms och rendera en Card-komponent för varje formulär */}
            {cards.map((card: any, index: number) => (
                <section className='card-stack__item' onClick={() => selectCard(card.id)} key={index}>
                    <Card cardData={card} selectedVendor={card.vendor}/>
                </section>
            ))}
        </section>
    );
};

export default CardStack;
