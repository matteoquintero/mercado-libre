import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchBox from '../components/search-box'

const Items: NextPage = () => {

  const router = useRouter()
  const [products, setProducts] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const currencyAr = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  useEffect(() => {
    try {
      fetch(`http://localhost:3100/api/v1/products?filter=${router.query.search}`,{
        headers:{
            'Authorization':'Mateo Quintero',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response =>{
        setProducts(response.items)
        setCategories(response.categories)
      });
    
    }
    catch (e) {
      console.log(e)
    }
  }, [router])

  return (
    <div>
      <Head>
        <title>Resultados</title>
        <meta name="description" content="Resultados busqueda mercado libre" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <SearchBox></SearchBox>

      <main className='grid grid-cols-12 mb-8 rounded-sm bg-white-brand text-black-brand'>
        <div className="flex col-span-10 col-start-2 my-4">
        {(categories && categories.length === 0) && <p>NODATA</p> }
        {(categories && categories.length > 0) && categories.map( (category:any,index:any) => (
          <div className='flex items-center' key={index}>
            <p className='text-xs'>
              {category}
            </p>
            <svg className="w-3 h-auto fill-gray-brand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
          </div>
        ))} 
        </div>
        <div className="col-span-10 col-start-2 bg-white">
          {(products && products.length === 0) && <p>NODATA</p> }
          {(products && products.length > 0) && products.map( (product:any,index:any) => (
            <Link
              href={`/items/${product.id}`}
              key={index}
            >
              <div className='px-4 cursor-pointer'>
                <div
                  className='grid grid-cols-12 gap-4 my-4 border-b w-100 border-white-brand'
                >
                  <div className='col-span-2'>
                    <Image className='rounded-sm' src={product.picture} alt={product.title} width={180} height={180}/>
                  </div>
                  <div className='flex flex-col justify-center col-span-5'>
                    <strong className='relative w-6/12 mb-8 text-2xl font-regular'>
                      {currencyAr.format(product.price.amount)}
                      {product.free_shipping && 
                      <div
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-6 h-6 bg-green-500 rounded-full top-1"
                      >
                        <svg className='w-4 h-4 fill-white' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" width="32px" height="32px"><path d="M 7 0 L 7 1.3417969 C 6.576376 1.4924358 6.2429479 1.8246651 6.0917969 2.2480469 C 4.3033496 2.8436846 3 4.515337 3 6.5 L 3.2988281 6.5 C 2.5706428 6.9382277 2 7.5927778 2 8.5 C 2 9.4072222 2.5706428 10.061772 3.2988281 10.5 L 3 10.5 L 3 15 L 4 15 L 5 15 L 5 14.5 C 5 13.664985 5.6649849 13 6.5 13 L 8.5 13 C 9.3350151 13 10 13.664985 10 14.5 L 10 15 L 11 15 L 12 15 L 12 10.5 L 11.701172 10.5 C 12.429357 10.061772 13 9.4072222 13 8.5 C 13 7.5927778 12.429357 6.9382277 11.701172 6.5 L 12 6.5 C 12 4.515337 10.69665 2.8436846 8.9082031 2.2480469 C 8.7570521 1.8246651 8.423624 1.4924358 8 1.3417969 L 8 0 L 7 0 z M 7.5 3 C 9.3256708 3 10.767849 4.4012247 10.935547 6.1816406 C 10.775144 6.1490279 10.669658 6 10.5 6 L 4.5 6 C 4.3303416 6 4.2248562 6.1490279 4.0644531 6.1816406 C 4.2321514 4.4012247 5.6743292 3 7.5 3 z M 4.5 7 L 10.5 7 C 11.335015 7 12 7.6649849 12 8.5 C 12 9.3350151 11.335015 10 10.5 10 L 4.5 10 C 3.6649849 10 3 9.3350151 3 8.5 C 3 7.6649849 3.6649849 7 4.5 7 z M 5 8 L 5 9 L 6 9 L 6 8 L 5 8 z M 9 8 L 9 9 L 10 9 L 10 8 L 9 8 z M 4 10.792969 C 4.1820704 10.83554 4.3054407 11 4.5 11 L 10.5 11 C 10.694559 11 10.81793 10.83554 11 10.792969 L 11 14.5 C 11 13.125015 9.8749849 12 8.5 12 L 6.5 12 C 5.1250151 12 4 13.125015 4 14.5 L 4 10.792969 z"/></svg>             
                      </div>                
                    }                        
                    </strong>
                    <p className='text-lg font-regular'>{product.title}</p>
                  </div>
                  <div className='flex justify-center col-span-5'>
                    <p className='text-xs mt-7'>{product.address}</p>
                  </div>
                </div>
              </div>
    

            </Link>
          ))
          }  
        </div>
      </main>
    </div>
  )
}

export default withRouter(Items)
