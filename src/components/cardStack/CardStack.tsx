// CardStack.tsx
import Card from '../card/Card';

interface Props {
    parsedForms: FormData[]; // Definiera en prop för parsedForms
}

const CardStack: React.FC<Props> = ({ parsedForms }) => {
    return (
        <div>
            {/* Använd map för att loopa igenom parsedForms och rendera en Card-komponent för varje formulär */}
            {parsedForms.map((form, index) => (
                <Card key={index} formData={form} />
            ))}
        </div>
    );
};

//TS definition av datan
type FormData = {
    id: number;
    cardnumber: string;
    cardHolderName: string;
    validThru: string;
    ccv: string;
    vendor: string;
};

export default CardStack;
