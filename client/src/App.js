import React, { useState, useEffect } from 'react';
import './App.css';
import ListingForm from './ListingForm';
import ItemListing from './ItemListing';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#00ff00',
    },
  },
});

function App() {
  const [itemListings, setItemListings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/posts`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setItemListings(data);
        console.log('Data:', data);
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch(error => console.error('Error fetching posts', error));
  }, []);

  const handleFormSubmit = (newItem) => {
    fetch(`http://localhost:3000/posts`, {
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
    fetch(`http://localhost:3000/posts${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Update the state to remove the deleted item
      setItemListings((prevListings) => prevListings.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>Hello World</p>
        <ListingForm onSubmit={handleFormSubmit} />
        {itemListings.map((item) => (
          <ItemListing key={item.id} {...item} onDelete={() => handleDelete(item.id)} />
          ))}
      </div>
    </ThemeProvider>
  );
}

export default App;
