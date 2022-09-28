import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Item: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Producto</title>
        <meta name="description" content="Producto mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome
        </h1>

      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Item