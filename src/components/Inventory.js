import React from "react";
import AddFishForm from "./AddFishForm";
import PropTypes from "prop-types";
import firebase from "firebase";
import 'firebase/database'; 
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    // this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      uid: null,
      owner: null,
      isSignedIn: false
    };
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    };
  }

  authHandler(err, authData) {
    const storeRef = firebase.database().ref(this.props.storeId);
    // query the firebase once for the store data
    storeRef.once("value", snapshot => {
      const data = snapshot.val() || {};

      // claim it as our if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        isSignedIn: !!authData.user,
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  };

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your Store's inventory</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </nav>
    );
  }

  logOut() {
    firebase.auth().signOut();
    this.setState({ uid: null });
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }
  render() {
    const logout = <button onClick={this.logOut}>Log Out!</button>;
    // check if they are no logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // check if they are the owner of the current store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
};
export default Inventory;
