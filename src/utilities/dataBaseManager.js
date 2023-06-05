import {} from "react-router-dom";

const getUser = () =>{
  const existingUser = sessionStorage.getItem('userId');
  if (existingUser) {
      return existingUser;
  }
  else{
    const newUser= 'user-' + new Date().getTime();
    sessionStorage.setItem('userId', newUser);
    return newUser;
  }
}

const getDataKey = () =>{
  const userId = getUser();
  return `emaJohn/carts/${userId}`;
}

// push to local storage:  a tamporary place for database.

const getDataBaseCart = () =>{
  const dataKey = getDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data) ;
}



const addToDataBaseCart = (key, count) =>{
  const currentCart = getDataBaseCart();
  currentCart[key] = count;
  localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}

const removeFromDataBaseCart = key =>{
  const currentCart = getDataBaseCart();
    delete currentCart[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}

const processOrder = cart =>{
  localStorage.removeItem(getDataKey())
}


export {
  getDataBaseCart,
  addToDataBaseCart,
  removeFromDataBaseCart,
  processOrder
}