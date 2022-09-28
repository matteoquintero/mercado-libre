import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Items: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Resultados</title>
        <meta name="description" content="Resultados busqueda mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome
        </h1>
        <Link href='/items/1'>Detail</Link>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Items
