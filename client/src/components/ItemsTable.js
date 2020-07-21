import React from 'react';

const ItemsTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.items.length > 0 ? (
        props.items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <button
                onClick={() => {
                  props.editItem(item);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteItem(item.id)}
                className="button muted-button"
              >
                Delete
              </button>
              <button
                onClick={() => props.showItem(item.id)}
                className="button muted-button"
              >
                Show
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>No Items presently</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ItemsTable;
