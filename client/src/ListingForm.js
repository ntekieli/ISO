import React, { useState } from 'react';

const ItemForm = ({ onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [user, setUser] = useState('');
  const [tags, setTags] = useState({
    tag1: false,
    tag2: false,
    tag3: false,
    // Add more tags as needed
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
      // Reset other tags as needed
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </label>
      <br />
      <label>
        User:
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </label>
      <br />
      <label>Tags:</label>
      <div>
        <label>
          Tag 1
          <input type="checkbox" checked={tags.tag1} onChange={() => handleTagChange('tag1')} />
        </label>
        <label>
          Tag 2
          <input type="checkbox" checked={tags.tag2} onChange={() => handleTagChange('tag2')} />
        </label>
        <label>
          Tag 3
          <input type="checkbox" checked={tags.tag3} onChange={() => handleTagChange('tag3')} />
        </label>
        {/* Add more tags as needed */}
      </div>
      <br />
      <button type="submit">Create Item Listing</button>
    </form>
  );
};

export default ItemForm;