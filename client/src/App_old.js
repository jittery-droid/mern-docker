import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    loadAll();
  }, []);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  const loadAll = async () => {
    await fetch('/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setItems(response.items))
      .then(() => updateTable());
  };

  const updateTable = () => {
    let table = document.getElementById('currentItems');
    for (let index = table.rows.length - 1; index > 0; index--) {
      table.deleteRow(index);
    }
    let index = table.rows.length;
    console.log(items);
    items.forEach((item) => {
      let entry = table.insertRow(index);
      entry.insertCell(0).innerHTML = item.id;
      entry.insertCell(1).innerHTML = item.name;
      entry.insertCell(2).innerHTML = item.price;
      entry.insertCell(3).innerHTML = item.quantity;
    });
  };

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const addItem = async () => {
    let item = {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
    };

    let newItem = await fetch(`/items/${id}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => loadAll());
  };

  const updateItem = async () => {
    let payload = {
      currentItems: items,
      item: {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      },
    };
    let request = await fetch(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setItems(response.items))
      .then(() => loadAll());
  };

  const deleteItem = async () => {
    let request = await fetch(`/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => loadAll());
  };

  const showItem = async () => {
    let request = await fetch(`/items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => popUp(response.item));
  };

  function popUp(item) {
    let message = `Id: ${item.id}, Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`;
    alert(message);
  }

  return (
    <div className="App">
      <div className="container">
        <table id="currentItems" cellPadding="1">
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </table>
        <div id="tableData"></div>
      </div>
      <div id="itemForm" style={{ right: '50%' }}>
        <h3>Enter Item Information to add or update an existing item</h3>
        <table>
          <tr>
            <td>ID:</td>
            <td>
              <input type="text" id="id" onChange={handleChangeId} />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <input type="text" id="name" onChange={handleChangeName} />
            </td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>
              <input type="text" id="price" onChange={handleChangePrice} />
            </td>
          </tr>
          <tr>
            <td>Quantity:</td>
            <td>
              <input
                type="text"
                onChange={handleChangeQuantity}
                id="quantity"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="button"
                id="add"
                value="Add Item"
                onClick={addItem}
              />
            </td>
            <td>
              <input
                type="button"
                id="update"
                value="Update Item"
                onClick={updateItem}
              />
            </td>
            <td>
              <input
                type="button"
                id="delete"
                value="Delete Item"
                onClick={deleteItem}
              />
            </td>
            <td>
              <input type="button" id="show" value="Show" onClick={showItem} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default App;
