
type ClearLocalStorageButtonProps = {
  onClear: () => void;
};

const ClearLocalStorageButton: React.FC<ClearLocalStorageButtonProps> = ({ onClear }) => {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    console.log('Local storage is cleared!!!');
    onClear();
  };

  return (
    <button onClick={handleClearLocalStorage}>
      Clear Local Storage
    </button>
  );
};

export default ClearLocalStorageButton;