
import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Shop  from './component/Shop/Shop';
import Review from './component/Review/Review';
import NoMatch from './component/NoMatch/NoMatch';
import Shipment from './component/Shipment/Shipment';
import LogIn from './component/LogIn/LogIn';
import Header from './component/Header/Header';
import ManageInventory from './component/ManageInventory/ManageInventory.js';


export const userContext = createContext();
function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
   <userContext.Provider value = {[logInUser, setLogInUser]}>
    <h3>email: {logInUser.email}</h3>
    <BrowserRouter>
    
        <Header/>
        <Routes>
          <Route path='/shop' element= {<Shop/>}>
            </Route>
            <Route path='/review' element={<Review/>}>
            </Route>
            <Route path='/manage' element = { <ManageInventory></ManageInventory>}></Route>
            <Route path='/shipment' element={<Shipment/>}>
            </Route>   
            <Route path='/logIn' element={<LogIn/>}>
            </Route>
            <Route path='/' element={<Shop/>}>
            </Route>    
            <Route path='*' element={<NoMatch/>}></Route>
          </Routes>
      </BrowserRouter>
   </userContext.Provider>
  );
}

export default App;
