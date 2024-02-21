
const Top: React.FC<{headline: string; cardType: string}> = ({headline, cardType}) => {

    return (
        <div>
            <h1 className='top-header'>{headline}</h1>
            <p className='card--type'>{cardType}</p>
        </div>
    );
};

export default Top;