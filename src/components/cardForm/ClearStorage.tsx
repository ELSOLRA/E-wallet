

const ClearLocalStorageButton = () => {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    console.log('Local storage cleared!');
  };

  return (
    <button onClick={handleClearLocalStorage}>
      Clear Local Storage
    </button>
  );
};

export default ClearLocalStorageButton;