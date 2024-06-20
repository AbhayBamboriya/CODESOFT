function useDebounce(cb,delay=2000){    //2s delay  
    let timerid
    //here use debounce is returning the moify callback
    return (...args)=>{
       
        console.log(...args);
        clearTimeout(timerid)
        timerid=setTimeout(()=>{
            cb(...args)    //calling the callback
        },delay)
    }
    
}
export default useDebounce       