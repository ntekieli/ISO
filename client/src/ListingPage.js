import React, { useState, useEffect } from 'react';
import ListingForm from './components/ListingForm.js';
import { ItemStack } from './components/ItemListing.js';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListingPage() {
    const [itemListings, setItemListings] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ISO_API}/posts`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItemListings(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching posts', error));
    }, []);

    const handleFormSubmit = (newItem) => {
        fetch(`${process.env.REACT_APP_ISO_API}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then(response => response.json())
            .then(data => {
                setItemListings(prevListings => [...prevListings, data]);
            })
            .catch(error => console.error('Error adding new post:', error));
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_ISO_API}/posts/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setItemListings(prevListings =>
                    prevListings.filter(item => item._id !== id)
                );
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    return (
        <Container style={{ padding: '20px' }}> {/* Adjusted styling for bootstrap */}
            <div className="App">
                <ListingForm onSubmit={handleFormSubmit} />
                <ItemStack items={itemListings} onDelete={handleDelete} />
            </div>
        </Container>
    );
}

export default ListingPage;
