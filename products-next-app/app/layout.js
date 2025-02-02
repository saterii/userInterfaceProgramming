import styles from './layout.module.css'
import Link from 'next/link'
import './globals.css'


export const metadata = {
  title: 'Products app',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.mainheader}>
        <div className={styles.header}>
          <div>
            <h1>THE FAKE STORE</h1>
            <h2>Fake store rest API</h2>
            <div>
              <Link className='navlink' href="/">Home</Link>
              <Link className='navlink' href="/products">Products</Link>
              <Link className='navlink' href="/about">About</Link>
            </div>
          </div>
          
                 
        </div>
        <div>{children}</div>
      </body>
    </html>
  )
}
