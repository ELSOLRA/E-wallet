
type ClearLocalStorageButtonProps = {
  onClear: () => void;
};

const ClearLocalStorageButton: React.FC<ClearLocalStorageButtonProps> = ({ onClear }) => {
  const handleClearLocalStorage = () => {
    console.log('Object is cleared!!!');
    onClear();
  };

  return (
    <button onClick={handleClearLocalStorage} className="card-button">
      REMOVE ACTIVE CARD
    </button>
  );
};

export default ClearLocalStorageButton;