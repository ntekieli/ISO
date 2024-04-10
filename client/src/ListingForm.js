// ItemForm.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tag from './ItemTag';

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
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <TextField
              required
              label="Item Name"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              label="User"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormLabel>Tags:</FormLabel>
              <Tag label="Tag 1" checked={tags.tag1} onChange={() => handleTagChange('tag1')} />
              <Tag label="Tag 2" checked={tags.tag2} onChange={() => handleTagChange('tag2')} />
              <Tag label="Tag 3" checked={tags.tag3} onChange={() => handleTagChange('tag3')} />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Item Listing
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
  

export default ItemForm;
