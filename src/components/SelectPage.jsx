import React, {useState} from "react";

function SelectPage({residents, setNumbersCards, button}){
   const [numbers, setNumbersPage] = useState({start: 0, limit: 8})
   const [actualButton, getActualButton] = button
   const buttons = []
   function btnPage(event){
      if(!actualButton || event!=actualButton){
         document.querySelectorAll(".select_page-btn").forEach(el=>{
            if(!actualButton && el.dataset.id == 1) el.classList.remove("page-btn-active")
            if(actualButton && el.dataset.id == actualButton.target.dataset.id) el.classList.remove("page-btn-active")
         })
         event.target.classList.add("page-btn-active")
      }
      setNumbersCards({start: parseInt(event.target.dataset.id)*20-20, limit: parseInt(event.target.dataset.id)*20})
      getActualButton(event)

      setTimeout(()=>{
         if(event.target.dataset.id!=1 && event.target.dataset.id == numbers.start+1) setNumbersPage({start: numbers.start-1, limit: numbers.limit-1})
         if(event.target.dataset.id!=buttons.length && event.target.dataset.id == numbers.limit) setNumbersPage({start: numbers.start+1, limit: numbers.limit+1})
      }, 400)
   }

   for(let i=1; i<=Math.ceil(residents/20); i++){
      buttons.push(<button key={`button-${i}`} onClick={btnPage} data-id={i} className={`select_page-btn${i==1 ? " page-btn-active" : ""}`} >{i}</button>)
   }

   return (
      <div onClick={(e)=> e.target.dataset.id} className="select_page">
         {buttons.length == 1 ? null : buttons.slice(numbers.start, numbers.limit)}
      </div>
   )
}
export default SelectPage