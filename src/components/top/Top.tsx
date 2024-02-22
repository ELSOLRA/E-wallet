import './top.scss'
const Top: React.FC<{headline: string; cardType: string}> = ({headline, cardType}) => {

    return (
        <div className="top">
            <h1 className='top__header'>{headline}</h1>
            <p className='top__card-type'>{cardType}</p>
        </div>
    );
};
export default Top;