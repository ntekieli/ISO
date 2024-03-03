// ItemForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ItemForm = ({ onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [user, setUser] = useState('');
  const [tags, setTags] = useState({
    tag1: false,
    tag2: false,
    tag3: false,
  });

  const handleTagChange = (tag) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      itemName,
      user,
      tags: Object.keys(tags).filter((tag) => tags[tag]),
    };

    onSubmit(newItem);

    setItemName('');
    setUser('');
    setTags({
      tag1: false,
      tag2: false,
      tag3: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          type="text"
          value = {itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="User"
          type="text"
          value = {user}
          onChange={(e) => setUser(e.target.value)}
        />
        
        <Button type="submit" variant="contained" color="primary">
          Create Item Listing
        </Button>
    </form>
  );
};

export default ItemForm;
