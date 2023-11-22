import styles from "./page.module.css"
import Link from 'next/link'

async function getData(){
  const response = await fetch("https://fakestoreapi.com/products")
  if(!response.ok){
    throw new Error("Failed to fetch data!")
  }
  return response.json();
}

function Product(props){
  return(
    <Link className={styles.product}  href={"products/" + props.item.id}>
      <p className={styles.itemTitle}>{props.item.title}</p>
      <img className={styles.itemImage} src={props.item.image}></img>
    </Link>
  )
}

async function Products(){
  const data = await getData()
  const products = data.map((item, index) => (
    <Product key={index} item={item}/>
  ))
  return(
    
    <div className={styles.storeContainer}>
        <h1>Products</h1>
        <div className={styles.store}>
          {products}
        </div>
      </div>
    

  )
}



export default async function Page() {
  
    return (
      <div>
        <Products/>
      </div>
    )
  }