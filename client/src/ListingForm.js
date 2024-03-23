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
        <FormGroup>
        <FormLabel>Tags:</FormLabel>
          <FormControlLabel
            control={<Checkbox checked={tags.tag1} onChange={() => handleTagChange('tag1')} />}
            label="Tag 1"
          />
          <FormControlLabel
            control={<Checkbox checked={tags.tag2} onChange={() => handleTagChange('tag2')} />}
            label="Tag 2"
          />
          <FormControlLabel
            control={<Checkbox checked={tags.tag3} onChange={() => handleTagChange('tag3')} />}
            label="Tag 3"
          />
        </FormGroup>
        
        <Button type="submit" variant="contained" color="primary">
          Create Item Listing
        </Button>
    </form>
  );
};

export default ItemForm;
