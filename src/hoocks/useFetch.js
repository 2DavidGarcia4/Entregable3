import { useState, useEffect } from "react";

function useFetch(){
   function getLocations(url){
      const [locations, getData] = useState([])
      let array = []
      function recursive(url1){
         fetch(url1).then(prom=> prom.json()).then(res=> {
            let mapa = res.results.map(m=> Object({id: m.id, name: m.name}))
            array = array.concat(mapa).flat()
            res.info.next ? recursive(res.info.next) : getData(array)
         }).catch(error=> console.error(error))
      }
      useEffect(()=>{
         recursive(url)
      }, [url])
      return locations
   }

   function getDimension(id=false, setNumbersCards){
      const [data, getData] = useState(null)
      useEffect(()=>{
         setNumbersCards({start: 0, limit: 20})
         const randomNum = Math.floor(Math.random()*125)+1
         console.log(randomNum)
         fetch(`https://rickandmortyapi.com/api/location/${id || randomNum}`).then(prom=> prom.json()).then(res=> getData(res)).catch(error=> console.error(error))
      }, [id])
      return data
   }

   function getResident(url){
      const [data, getData] = useState(null)
      useEffect(()=>{
         fetch(url).then(prom=> prom.json()).then(res=> getData(res)).catch(error=> console.error(error))
      }, [url])
      return data
   }

   return {getLocations, getDimension, getResident}
}
export default useFetch