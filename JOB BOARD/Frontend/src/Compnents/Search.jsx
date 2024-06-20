import { useDispatch } from "react-redux"
import useDebounce from "../Hook/useDebounceHook"
// import { filteredData } from "../Redux/Slices/JobInternSlice"
import { useRef } from "react"

function Search({updateSearchTerm,placeholder,id}){
    const debouncedCallback=useDebounce((e)=>updateSearchTerm(e.target.value))
    const inputRef=useRef('')
    const dispatch=useDispatch()
    // const filter=()=>{
        
    //     dispatch(filteredData(inputRef.current.value))
    // }
    return (
        <div className='search-wrapper bg-back'>
            <input 
                id={`${id}`}
                type="text"
                placeholder={`${placeholder}`}
                onChange={debouncedCallback}
                className="h-full p-2 w-full"
                // ref={inputRef}
            />
           {/* { console.log('value',)} */}
        </div>
    )
}

export default Search