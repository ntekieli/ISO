// ItemListing.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { List, ListItem, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const ItemStack = ({ items, onDelete }) => {
  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <ItemListing
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          user={item.user}
          tags={item.tags}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </Stack>
  );
};

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

export {ItemListing, ItemStack};
