import { ChangeEvent } from "react"
import { locationData } from "../types"

  
type Props = {
	location: string
	suggestions: []
	inputChange: (e: ChangeEvent<HTMLInputElement>) => void
	onOptionSelect: (item: locationData) => void
	onSubmit: () => void
}

  const Search = ({location, suggestions, inputChange, onOptionSelect, onSubmit}: Props): JSX.Element => {
  return (
      <section className='bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg h-full w-full md:max-w-[500px] md:max-h-[500px] p-4 flex flex-col justify-center items-center text-center md:px-10 lg:p-24  text-zinc-700'>
        
        <h1 className='text-4xl font-thin'>Weather<span className='font-black'>Forecast</span></h1>
        <p className='text-sm mt-2'>
          Enter a location to get its weather forecast.
        </p>

        <div className='relative flex mt-10 md:mt-5'>
          <input type="text" onChange={inputChange} value={location} className='px-2 py-1 rounded-l-md border-2 border-white' />
         <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {suggestions.map((item: locationData, index: number)=>(
              <li key={item.name + "-" + index}>
                <button className='text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer' onClick={()=>{onOptionSelect(item)}}>{`${item.name}, ${item.country}, ${item.state}`}</button>
              </li>
            ))}
         </ul> 
          <button className='rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer' onClick={onSubmit}>Search</button>
        
        </div>
      </section>

  )
}

export default Search; 
