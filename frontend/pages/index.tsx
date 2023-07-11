import React, { useState } from 'react';

const Home = () => {
  const [address, setAddress] = useState('');
  const [nefturian, setNefturian] = useState(null);
  const [error, setError] = useState(null);

  const getOrCreateNefturian = async () => {
    try {
      const response = await fetch(`http://localhost:3000/nefturian/${address}`);
      
      if (response.ok) {
        const data = await response.json();
        setNefturian(data);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        setError(errorData.error);
        setNefturian(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setNefturian(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address"
      />
      <button onClick={getOrCreateNefturian}>Get or Create Nefturian</button>
      
      {nefturian && (
        <div>
          <h3>Nefturian Information</h3>
          <p>Id: {nefturian.id}</p>
          <p>Name: {nefturian.name}</p>
          <p>Profile Picture: <img src={nefturian.pfp} alt={nefturian.pfp} /></p>
        </div>
      )}

      {error && (
          <div>
            <p>Error: {error}</p>
          </div>
      )}
    </div>
  );
};

export default Home;

