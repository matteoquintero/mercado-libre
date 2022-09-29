import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchBox from '../components/search-box'

const Items: NextPage = () => {
  const router = useRouter()
  const filter = router.query.search

  const [products, setProducts] = useState<any>([])

  const getProducts = async () => {
    try {
      fetch(`http://localhost:3100/api/v1/products?filter=${filter}`,{
        headers:{
            'Authorization':'Mateo Quintero',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response =>{
        console.log({response})
        setProducts(response.items)
      });
    
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div>
      <Head>
        <title>Resultados</title>
        <meta name="description" content="Resultados busqueda mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <SearchBox></SearchBox>

      <main className='bg-white-brand text-black-brand'>
        {(products && products.length === 0) && <p>NODATA</p> }
        {(products && products.length > 0) && products.map( (product:any,index:any) => (
          <div 
            key={index}
          >
            <Link href={`/items/${product.id}`}>ver producto</Link>
            <Image src={product.picture} alt={product.title} width={200} height={200}/>
            <p>{product.title}</p>
            <p>{product.condition}</p>
            <p>{product.free_shipping}</p>
            <p>{product.address}</p>
          </div>
        ))
        }
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Items
