import type { NextPage } from 'next'
import Head from 'next/head'
import SearchBox from '../components/search-box'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Buscar</title>
        <meta name="description" content="Caja busqueda mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <SearchBox></SearchBox>
      <main>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default Home