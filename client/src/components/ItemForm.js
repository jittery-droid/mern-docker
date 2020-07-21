import React, { useState } from 'react';

const ItemForm = (props) => {
  const initialFormState = {
    id: '',
    name: '',
    price: '',
    quantity: '',
  };

  const [item, setItem] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.addItem(item);
        setItem(initialFormState);
      }}
    >
      <label>ID</label>
      <input
        type="text"
        name="id"
        value={item.id}
        onChange={handleInputChange}
      />
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleInputChange}
      />
      <label>Price</label>
      <input
        type="text"
        name="price"
        value={item.price}
        onChange={handleInputChange}
      />
      <label>Quantity</label>
      <input
        type="text"
        name="quantity"
        value={item.quantity}
        onChange={handleInputChange}
      />
      <button>Add Item</button>
    </form>
  );
};

export default ItemForm;
