import React, { useEffect, useState } from 'react';
import './App.css';
import ItemsTable from './components/ItemsTable';
import ItemForm from './components/ItemForm';
import EditForm from './components/EditForm';

const App = () => {
  useEffect(() => {
    loadAll();
  }, []);

  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    name: '',
    price: '',
    quantity: '',
  });

  const loadAll = async () => {
    await fetch('/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setItems(response.items));
  };

  const addItem = async (item) => {
    let newItem = await fetch(`/items/${item.id}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => loadAll());
  };

  const editItem = async (item) => {
    setEditMode(true);
    setSelectedItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
  };

  const updateItem = async (item) => {
    setEditMode(false);
    let request = await fetch(`/items/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => loadAll());
  };

  const deleteItem = async (id) => {
    let request = await fetch(`/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => loadAll());
  };

  const showItem = async (id) => {
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
      <h1>Full stack dockerized</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editMode ? (
            <div>
              <h2>Edit Item</h2>
              <EditForm
                setEditMode={setEditMode}
                selectedItem={selectedItem}
                updateItem={updateItem}
              />
            </div>
          ) : (
            <div>
              <h2>Add Item</h2>
              <ItemForm addItem={addItem} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Current Items</h2>
          <ItemsTable
            items={items}
            deleteItem={deleteItem}
            editItem={editItem}
            showItem={showItem}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
