import React from 'react';

const ItemListing = ({ id, itemName, user, tags, onDelete }) => {
  return (
    <div>
      <h3>{itemName}</h3>
      <p>User: {user}</p>
      {tags && (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      )}
      <button onClick={() => onDelete(id)}>DELETE</button>
    </div>
  );
};

export default ItemListing;