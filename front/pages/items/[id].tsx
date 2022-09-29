import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/search-box'

const Item: NextPage = () => {
  const router = useRouter()
  const [product, setProduct] = useState<any>([])
  const currencyAr = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  useEffect(() => {
    try {
      fetch(`http://localhost:3100/api/v1/product?id=${router.query.id}`,{
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
  }, [router])

  return (
    <div>
      <Head>
        <title>Producto</title>
        <meta name="description" content="Producto mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <SearchBox></SearchBox>
      <main className='grid grid-cols-12 bg-white-brand'>
        {(product && product.length === 0) && <p>NODATA</p> }
        {(product && product.id ) && 
          <div className="col-span-10 col-start-2 mb-8 bg-white rounded-sm text-black-brand">
            <div className='grid grid-cols-12'>
                <div className='flex justify-center col-span-9'>
                  <Image src={product.picture} alt={product.title} width={680} height={680}/>
                </div>
                <div className='col-span-3'>
                  <p className='mt-8 mb-4 text-sm'>{product.condition} - {product.sold_quantity} vendidos</p>
                  <p className='text-2xl font-bold'>{product.title}</p>
                  <p className='my-8 font-regular text-[46px]'>{currencyAr.format(product.price.amount)}</p>
                  <button className='mr-8 text-white rounded-sm h-9 bg-blue-brand'>Comprar</button>
                </div>
                <div className='flex flex-col items-center justify-center col-span-9'>
                  <div className='w-mercado'>
                    <h1 className='text-2xl font-bold'>Descripcion del producto</h1>
                    <p className='my-8'>{product.description}</p>
                  </div>
                </div> 
            </div>
          </div>
        }
      </main>
    </div>
  )
}

export default withRouter(Item)