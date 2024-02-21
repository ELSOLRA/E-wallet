// CardStack.tsx
import Card from '../card/Card';

const CardStack = ({ cards }: any) => {
    const myCards = cards;

    return (
        <div>
            {/* Använd map för att loopa igenom parsedForms och rendera en Card-komponent för varje formulär */}
            {myCards.map((card: object, index: number) => (
                <Card key={index} index={card} />
            ))}
        </div>
    );
};

export default CardStack;
