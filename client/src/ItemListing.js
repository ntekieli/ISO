// ItemListing.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={onDelete}>Delete</button>
      </CardContent>
    </Card>
  );
};

export default ItemListing;
