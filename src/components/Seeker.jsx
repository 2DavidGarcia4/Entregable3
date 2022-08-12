import React, {useState, useEffect} from "react";
import useFetch from "../hoocks/useFetch";

function Seeker({getId}){
   const {getLocations} = useFetch()
   let {info, locations} = getLocations("https://rickandmortyapi.com/api/location")
   const [text, setText] = useState("")
   const [options, setOptions] = useState([])

   function optionClick(event){
      const form = document.querySelector(".seeker")
      setText(locations.find(f=> f.id==event.target.dataset.id).name)
      form.classList.remove("seeker-active")
      getId(event.target.dataset.id)
      console.log(event.target.dataset.id)
   }

   function inputChange(event){
      const form = document.querySelector(".seeker")
      setText(event.target.value)
      if(event.target.value.trim()){
         form.classList.add("seeker-active")
         setOptions(locations.filter(f=> f.name.toLocaleLowerCase().startsWith(event.target.value.toLocaleLowerCase())).map(m=> <li key={m.id} onClick={optionClick} className="autocomp_option" data-id={m.id}>{m.name}</li>))
         
      }else{
         form.classList.remove("seeker-active")
         setOptions([])
      }
      // console.log(event.target.value!=" ")
      // console.log(locations.filter(f=> f.name.toLocaleLowerCase().startsWith(event.target.value.toLocaleLowerCase())))
   }

   return (
      <form className="seeker">
         <label htmlFor="location" className="search" ><i id="icon-search" className="fi fi-br-search"></i></label>
         <input onChange={inputChange} type="text" list="locations" id="location" placeholder="Location" value={text} />
         <div className="separator"></div>
         <ul className="autocomp-box">
            {options}
         </ul>
      </form>
   )
}
export default Seeker