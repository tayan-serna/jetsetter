import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true }
];

class Application extends Component {
  state = {
    items: defaultState
  };

  handleChange = e => {
    e.persist();
    this.setState(state => {
      const { items } = state;
      const newItem = state.items.find(item => item.id === e.target.id);
      newItem.packed = !newItem.packed;
      const itemIndex = state.items.indexOf(newItem);
      items[itemIndex] = newItem;
      return {
        items
      };
    });
  };

  handleRemove = id => {
    this.setState(state => {
      const { items } = state;
      const newItem = state.items.find(item => item.id === id);
      const itemIndex = state.items.indexOf(newItem);
      items.splice(itemIndex, 1);
      return { items };
    });
  };

  onSubmit = item => {
    const { items } = this.state;
    items.unshift(item);
    this.setState({ items });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="Application">
        <NewItem onSubmit={this.onSubmit} />
        <CountDown />
        <Items
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          title="Unpacked Items"
          items={items.filter(item => !item.packed)}
        />
        <Items
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          title="Packed Items"
          items={items.filter(item => item.packed)}
        />
        <button className="button full-width">Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
