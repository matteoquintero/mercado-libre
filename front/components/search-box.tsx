import {useRouter} from 'next/router'
import Image from 'next/image'

const SearchBox = () => {
    const router = useRouter()
    const handleSubmit = (e:any) => {
      e.preventDefault()
      const search = e.target.search.value
      router.push({
        pathname:`items`,
        query:{ search: search }
      })
    }    
    return(
        <header className='grid grid-cols-12 gap-4 bg-yellow-brand h-14'>
            <div className="flex items-center col-span-1 col-start-2">
                <Image src="/logo.png" alt='Logo mercado libre' width={42} height={32}></Image>
            </div>
            <div className="flex items-center col-span-9">
                <form className="relative w-full" onSubmit={handleSubmit} autoComplete='off'>
                <input 
                    className="block w-full h-8 text-lg bg-white rounded-sm pl-7 text-black-brand"
                    type="text" 
                    name="search" 
                    placeholder="Nunca dejes de buscar" 
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-8 h-8 rounded-sm bg-white-brand"
                    type="submit"
                    tabIndex={4}
                >
                    <svg className='w-5 h-5 fill-gray-brand' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
                </button>
            
                </form>
            </div>
        </header>        
    )
}

export default SearchBox