// ItemListing.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { List, ListItem, Button } from '@mui/material';

const ItemListing = ({ id, itemName, user, tags = [], onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{itemName}</Typography>
        <Typography variant="body1">ID: {id}</Typography>
        <Typography variant="body1">User: {user}</Typography>
        {tags.length > 0 && (
          <div>
            <Typography variant="subtitle1">Tags:</Typography>
            <List>
              {tags.map((tag, index) => (
                <ListItem key={index}>{tag}</ListItem>
              ))}
            </List>
          </div>
        )}
        <Button variant="contained" color="secondary" onClick={onDelete} hover>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemListing;
