import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/search-box'

const Item: NextPage = () => {
  const router = useRouter()
  const id = router.query.id
  console.log({router})

  const [product, setProduct] = useState<any>([])

  const getProduct = async () => {
    console.log('getProduct')
    try {
      fetch(`http://localhost:3100/api/v1/product?id=${id}`,{
        headers:{
            'Authorization':'Mateo Quintero',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response =>{
        console.log({response})
        setProduct(response.item)
      });
    
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div>
      <Head>
        <title>Producto</title>
        <meta name="description" content="Producto mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <SearchBox></SearchBox>
      <main>
        {(product && product.length === 0) && <p>NODATA</p> }
        {(product && product.id ) && 
          <div >
            <Image src={product.picture} alt={product.title} width={200} height={200}/>
            <p>{product.title}</p>
            <p>{product.condition}</p>
            <p>{product.free_shipping}</p>
            <p>{product.address}</p>
          </div>
        }

      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Item