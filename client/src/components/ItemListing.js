import React from 'react';
import { Card, Button, ToggleButton, ToggleButtonGroup, ListGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

const ItemStack = ({ items, onDelete, onSortChange, onFilterChange }) => {
  
  const handleSortChange = (val) => {
    if (val !== null) {
      onSortChange(val);
    }
  };

  const handleFilterChange = (val) => {
    if (val !== null) {
      onFilterChange(val);
    }
  };

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-3 justify-content-center">
        <ToggleButtonGroup
          type="radio"
          name="sortingOptions"
          defaultValue={null}
          onChange={(e) => handleSortChange(e.currentTarget.value)}
        >
          <ToggleButton id="tbg-radio-1" value="name" variant="outline-secondary">
            Sort by Name
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value="date" variant="outline-secondary">
            Sort by Date
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          type="radio"
          name="filterOptions"
          defaultValue={null}
          onChange={(e) => handleFilterChange(e.currentTarget.value)}
        >
          <ToggleButton id="tbg-radio-3" value="available" variant="outline-secondary">
            Available
          </ToggleButton>
          <ToggleButton id="tbg-radio-4" value="notAvailable" variant="outline-secondary">
            Not Available
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      
      <Stack gap={3}>
        {items.map((item) => (
          <ItemListing
            key={item._id}
            id={item._id}
            itemName={item.itemName}
            user={item.user}
            tags={item.tags}
            onDelete={() => onDelete(item._id)}
          />
        ))}
      </Stack>
    </>
  );
};

const ItemListing = ({ id, itemName, user, tags = [], onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text>ID: {id}</Card.Text>
        <Card.Text>User: {user}</Card.Text>
        {tags.length > 0 && (
          <div>
            <Card.Subtitle className="mb-2">Tags:</Card.Subtitle>
            <ListGroup variant="flush">
              {tags.map((tag, index) => (
                <ListGroup.Item key={`${id}-${tag}-${index}`}>{tag} </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <Button variant="primary" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export { ItemListing, ItemStack };
