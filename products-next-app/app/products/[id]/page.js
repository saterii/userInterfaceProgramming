'use client'

import { useParams } from "next/navigation"
import styles from '../page.module.css';
import Link from 'next/link'

async function getData(id){
    const response = await fetch("https://fakestoreapi.com/products/" + id)
    if(!response.ok){
      throw new Error("Failed to fetch data!")
    }
    const data = await response.json()
    return data
  }


export default async function Page(){
    let fetched = false
  const params = useParams()
  
  const product = await getData(params.id)
  return (
    <div>
        <h1 className={styles.title}>Product page</h1>
        <div className={styles.productContainer}>
            <img src={product.image}></img>
            <div className={styles.info}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}€</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <Link href="/products">Back</Link>
            </div>
            
            
        </div>
    </div>
  );
}

