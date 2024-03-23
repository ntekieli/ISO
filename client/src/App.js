import React, { useState, useEffect } from 'react';
import './App.css';
import ListingForm from './ListingForm';
import ItemListing from './ItemListing';



function App() {
  const [itemListings, setItemListings] = useState('http://localhost:3000');

  useEffect(() => {
    fetch('/posts')
    .then(response => response.json())
    .then(data => {
      setItemListings(data);
    })
    .catch(error => console.error('Error fetching posts', error));
  }, []);

  const handleFormSubmit = (newItem) => {
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      // Update the state with the new item
      setItemListings((prevListings) => [...prevListings, data]);
    })
    .catch(error => console.error('Error adding new post:', error));
  };

  const handleDelete = (id) => {
    fetch(`/posts/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Update the state to remove the deleted item
      setItemListings((prevListings) => prevListings.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <div className="App">
      <ListingForm onSubmit={handleFormSubmit} />
      {itemListings.map((item) => (
        <ItemListing key={item.id} {...item} onDelete={() => handleDelete(item.id)} />
        ))}
    </div>
  );
}

export default App;
