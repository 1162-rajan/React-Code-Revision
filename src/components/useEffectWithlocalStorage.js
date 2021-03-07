import React from 'react';

const useCustomLocalStorage = (key, initial) => {
  // when there is an expensive call in useState argument we prefer lazy initialisation

  const [name, setName] = React.useState(
    () => window.localStorage.getItem(key) || initial
  );

  // const [name, setName] = React.useState('');

  React.useEffect(() => {
    window.localStorage.setItem(key, name);
  }, [name, key]);
  //handling input

  return [name, setName];
};

const Greeting = ({ initial = '' }) => {
  const [name, setName] = useCustomLocalStorage('name', initial);
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form>
      <label htmlFor="Name">Name :</label>
      <input onChange={handleChange} value={name} />
      {name ? (
        <strong>Hello {name}</strong>
      ) : (
        <p style={{ color: 'red' }}>Please enter your name!</p>
      )}
    </form>
  );
};

export default Greeting;
