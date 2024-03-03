import React, { useState } from 'react';
import './App.css';
import ListingForm from './ListingForm';
import ItemListing from './ItemListing';

function App() {
  const [itemListings, setItemListings] = useState([]);

  const handleFormSubmit = (newItem) => {
    // Update the state with the new item
    setItemListings((prevListings) => [...prevListings, newItem]);
  }; 

  return (
    <div className="App">
      <p>Hello World</p>
      <ListingForm onSubmit={handleFormSubmit} />
      {itemListings.map((item) => (
        <ItemListing {...item} />
        ))}
    </div>
  );
}

export default App;
