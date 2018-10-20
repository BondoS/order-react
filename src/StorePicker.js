import React from 'react';
import { render } from 'react-dom';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        { /* here is a comment */}        
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"/>
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker;

// render(<StorePicker/>, document.querySelector('#main'));