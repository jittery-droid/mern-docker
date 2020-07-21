import React, { useState } from 'react';

const EditForm = (props) => {
  const [item, setItem] = useState(props.selectedItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.updateItem(item);
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
      <button>Update Item</button>
      <button
        className="button muted-button"
        onClick={() => props.setEditMode(false)}
      ></button>
    </form>
  );
};

export default EditForm;
