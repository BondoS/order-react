import Rebase from 're-base';
import firebase from "firebase/app";
import 'firebase/database'; 

const config  = {
  apiKey: "AIzaSyDsXfovhxdrTLliz3KrW-EiyyDpidPiI58",
  authDomain: "order-react-learn.firebaseapp.com",
  databaseURL: "https://order-react-learn.firebaseio.com",
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base;
