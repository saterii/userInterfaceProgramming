import React, { useState, useEffect } from 'react';
import './App.css';

function Product(props) {
  return (
    <div className='productContainer'>
      <img className="itemImage" src={props.item.image} alt={props.item.title} />
      <p className="itemTitle">{props.item.title}</p>
      <p className="itemPrice">{props.item.price}€</p>
      <p>{props.item.description}</p>
    </div>
  );
}

async function fetchProduct(id) {
  try {
    const response = await fetch(`/.netlify/functions/products?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
}

function App() {
  const [productId, setProductId] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProduct(productId);
      setProduct(productData);
    };
    fetchData();
  }, [productId]);

  const increaseID = () => {
    if (productId < 20) {
      setProductId(productId + 1);
    }
  };

  const decreaseID = () => {
    if (productId > 1) {
      setProductId(productId - 1);
    }
  };
  if(productId > 1 && productId < 20){
    return (
      <div className='App'>
        
        <div className='product'>
          {product ? <Product item={product} /> : <p>Loading...</p>}
        </div>
        <div className='buttons'>
          <p>Item: {productId}</p>
          <button onClick={decreaseID}>Previous</button>
          <button onClick={increaseID}>Next</button>
        </div>
      </div>
    );
  }
  else if(productId == 1){
    return (
      <div className='App'>
        
        <div className='product'>
          {product ? <Product item={product} /> : <p>Loading...</p>}
        </div>
        <div className='buttons'>
          <p>Item: {productId}</p>
          
          <button onClick={increaseID}>Next</button>
        </div>
      </div>
    );
  }
  else if(productId == 20){
    return (
      <div className='App'>
        
        <div className='product'>
          {product ? <Product item={product} /> : <p>Loading...</p>}
        </div>
        <div className='buttons'>
          <p>Item: {productId}</p>
          
          <button onClick={decreaseID}>Previous</button>
        </div>
      </div>
    );
  }
}

export default App;