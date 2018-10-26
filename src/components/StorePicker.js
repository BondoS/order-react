import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';



class StorePicker extends React.Component {

  // constructor(){
  //   super();
  //   this.StorePicker = this.StorePicker.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();

    const storeId = this.storeInput.value;
    this.props.history.push(`/store/${storeId}`);
    // first grab the text from the box 
    // second we're going to transition from / to /store/:storeId
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        { /* here is a comment */}        
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
         defaultValue={getFunName()}
         ref={(input) => { this.storeInput = input}}
         />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: PropTypes.object
}

export default StorePicker;