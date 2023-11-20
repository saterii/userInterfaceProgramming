import './App.css';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchItems } from './itemsSlice';
import { addToCart, removeFromCart } from './cartSlice';
function Product(props){
  const dispatch = useDispatch();

  return(
    <div className="StoreItem">
      <img className="itemImage" src={props.item.image} alt={props.item.title} />
      <button className='itemButton' onClick={() => dispatch(addToCart(props.item))}>
        Add to cart
      </button>
      <p className="itemTitle">{props.item.title}</p>
      <p className="itemPrice">{props.item.price}€</p>
      <p>{props.item.description}</p>
    </div>
  )
}

function Products() {
  const { items, status } = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  if (status === "loading" || !items || items.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  } else {
    const shopItems = items.map((item, index) => (
      <Product key={index} item={item} />
    ));
    return (
      <div className='storeContainer'>
        <h1>Products</h1>
        <div className="Store">
          {shopItems}
        </div>
      </div>
    );
  }
}

function CartItem(props){
  const dispatch = useDispatch();
  return(
  <div className="cartItem">
      <img className="cartItemImage" src={props.item.image}></img>
      <div>
      <p className="itemTitle">{props.item.title}</p>
      <p className="itemPrice">{props.item.price}€</p>
      </div>
      <button className='x' onClick={() => dispatch(removeFromCart(props.item))}>x</button>
    </div>
  )
}

function ShoppingCart() {
  const { cartItems } = useSelector(state => state.cartItems);

  const cartItemList = cartItems.map((item, index) => (
    <CartItem key={index} item={item} />
  ));

  const totalPrice = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.price;
  }, 0);

  return (
    <div className='shoppingCart'>
      <h1>Cart</h1>
      {cartItemList}
      <p>Total: {totalPrice}€</p>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      
      <Products/>
      <ShoppingCart/>
      
    </div>
  );
}

export default App;
