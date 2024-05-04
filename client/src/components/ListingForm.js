import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Tag from './ItemTag'; // Assuming ItemTag handles layout inline

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
    <Container className="item-form-container mt-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm={4}>
            <Form.Group controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="user">
              <Form.Label>User</Form.Label>
              <Form.Control
                required
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="itemTags">
              <Form.Label>Tags</Form.Label>
              <div className="tags-container">
                {['ISO', 'OSI', 'Rideshare'].map(tag => (
                  <Tag key={tag} label={tag} checked={tags[tag]} onChange={() => handleTagChange(tag)} />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100">
          Create Item Listing
        </Button>
      </Form>
    </Container>
  );
};

export default ItemForm;
