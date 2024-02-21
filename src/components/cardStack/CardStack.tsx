// CardStack.tsx
import Card from '../card/Card';


const CardStack: React.FC<{cards: Array<Object>; selectCard: Function}> = ({ cards, selectCard }) => {
   

    return (
        <div>
            {/* Använd map för att loopa igenom parsedForms och rendera en Card-komponent för varje formulär */}
            {cards.map((card: any, index: number) => (
                <div onClick={() => selectCard(card.id)} key={index}>
                    <Card cardData={card} selectedVendor={card.vendor}/>
                </div>
            ))}
        </div>
    );
};

export default CardStack;
