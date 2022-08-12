import React, {useState} from "react";

function SelectPage({residents, numbersCards, setNumbersCards}){
   const [numbers, setNumbersPage] = useState({start: 0, limit: 8})
   const [actualButton, getActualButton] = useState(undefined)
   const buttons = []
   function btnPage(event){
      if(!actualButton || event!=actualButton){
         // console.log(actualButton)
         document.querySelectorAll(".select_page-btn").forEach(el=>{
            if(!actualButton && el.dataset.id == 1) el.classList.remove("page-btn-active")
            
            if(actualButton && el.dataset.id == actualButton.target.dataset.id) el.classList.remove("page-btn-active")
            
         })
         event.target.classList.add("page-btn-active")
         // console.log("hola")
      }
      setNumbersCards({start: parseInt(event.target.dataset.id)*20-20, limit: parseInt(event.target.dataset.id)*20})
      getActualButton(event)
      // console.log(numbers)
      // console.log(event.target.dataset.id!=1)
      // console.log(event.target.dataset.id)
      // console.log(numbers.start)

      setTimeout(()=>{
         if(event.target.dataset.id!=1 && event.target.dataset.id == numbers.start+1) setNumbersPage({start: numbers.start-1, limit: numbers.limit-1})
         if(event.target.dataset.id!=buttons.length && event.target.dataset.id == numbers.limit) setNumbersPage({start: numbers.start+1, limit: numbers.limit+1})
      }, 400)

      // console.log(event.target.dataset.id)
   }
   // console.log(residents)
   for(let i=1; i<=Math.ceil(residents/20); i++){
      buttons.push(<button key={`button-${i}`} onClick={btnPage} data-id={i} className={`select_page-btn${i==1 ? " page-btn-active" : ""}`} >{i}</button>)
   }

   return (
      <div onClick={(e)=> e.target.dataset.id} className="select_page">
         {buttons.length == 1 ? null : buttons.slice(numbers.start, numbers.limit)}
         {/* {setTimeout(()=> buttons.length == 1 ? null : buttons.slice(numbers.start, numbers.limit), 6000)} */}
      </div>
   )
}
export default SelectPage