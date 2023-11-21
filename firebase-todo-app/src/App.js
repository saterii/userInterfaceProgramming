import './App.css';
import React, { useState, useEffect, } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore/lite';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "api_key",
  authDomain: "todo-75e32.firebaseapp.com",
  projectId: "todo-75e32",
  storageBucket: "todo-75e32.appspot.com",
  messagingSenderId: "751608666552",
  appId: "1:751608666552:web:20f53d665e806ea377174d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

function ToDoFormAndList() {
  const navigate = useNavigate()
  const {state} = useLocation()
  
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // load todo list items
  useEffect(() => {
    const fetchData = async () => {
      // connect todos collection
      const todosCol = collection(db, 'todos');
      const todoSnapshot = await getDocs(todosCol);
      // todo text and id 
      // document id is unique, so it can be used with deleting todo
      const todos = todoSnapshot.docs.map(doc => {
        return  { 
          text: doc.data().text,
          id: doc.id 
        };
      });
      // set states
      console.log(todos);
      setItems(todos);
      setLoading(false);
    }
    // start loading data
    console.log("fetch data...")
    fetchData();
  },[]); // called only once



  const removeItem = (item) => {
    // delete from firebase
    deleteDoc(doc(db, "todos", item.id));
    // delete from items state and update state
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray); 
  }

  const handleSubmit = async (event) => {
    // prevent normal submit event
    event.preventDefault();
    // add item to Firebase
    let newItem =  { text: itemText };
    const docRef = await addDoc(collection(db, "todos"), newItem);
    // get added doc id and set id to newItem
    newItem.id = docRef.id;
    // update states in App
    setItems( [...items, newItem]);
    // modify newItem text to ""
    setItemText("")
  }
  if(state == null){
    navigate("/")
  }
  else{
    return (
      
      <div>
        <Banner />
        <form onSubmit={handleSubmit}>
          <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
          <input type='submit' value='Add'/>
        </form>
        <ul>
        { loading  && 
          <p>Loading...</p>
        }
        {items.map(item => (
          <li key={item.id}>
            {item.text+" "} <span onClick={() => removeItem(item)}> x </span>
          </li>
        ))}
      </ul>    
      </div>
    )  
  }
      
}

function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("password")
  const [errorMessage, setErrorMessage] = useState("")
  const auth = getAuth();
  const loginUser = () => {
    setErrorMessage("")
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
        navigate('/todos', { state: { user: user.email } });
        
        // ...
      })
      .catch(() => {
        setErrorMessage("Incorrect credentials!")
      });
  }
  return(
    <div id="login">
      <h1>Login</h1>
      <label for="1">Email:</label>
      <input id="1" type="email" placeholder={email} onChange={event => setEmail(event.target.value)} className='input'></input>
      <label for="2">Password:</label>
      <input id="2" type="password" placeholder={password} onChange={event => setPassword(event.target.value)} className='input'></input>
      <p>{errorMessage}</p>
      <button onClick={() => loginUser()}>Log in</button>
      
    </div>
  )
}


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" Component={Login}/>
        <Route exact path="/todos" Component={ToDoFormAndList} />
      </Routes>
    </Router>
  );
}

export default App;
