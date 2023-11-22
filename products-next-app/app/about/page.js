import styles from "./page.module.css"




export default async function Page() {
  
    return (
      <div className={styles.main}>
        <h1 className={styles.headertext}>About</h1>
        <p>This app is a fake store that contains fake items that you can look at.</p>
      </div>
    )
  }