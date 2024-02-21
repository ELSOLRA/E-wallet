
type ClearLocalStorageButtonProps = {
  onClear: () => void;
};

const ClearLocalStorageButton: React.FC<ClearLocalStorageButtonProps> = ({ onClear }) => {
  const handleClearLocalStorage = () => {
    console.log('Object is cleared!!!');
    onClear();
  };

  return (
    <button onClick={handleClearLocalStorage}>
      Remove Da Card !!!
    </button>
  );
};

export default ClearLocalStorageButton;