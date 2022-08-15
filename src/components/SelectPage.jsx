import React, {useState} from "react";

function SelectPage({residents, setNumbersCards, button}){
   const [numbers, setNumbersPage] = useState({start: 0, limit: 8}) // Para mostrar solo 8 botones
   const [actualButton, getActualButton] = button 
   const buttons = [] // Areglo de botones

   if(buttons && !actualButton){ // Al seleccionar una nueva dimencion que se restablezca el boton activo al primero
      document.querySelectorAll(".select_page-btn").forEach(el=>{
         if(el.dataset.id == 1){
            el.classList.add("page-btn-active")
         }else{
            el.classList.remove("page-btn-active")
         }
      })
   }

   function btnPage(event){ // Al dar clic a un boton que se active, se desactive el anterior y cambie la pagina
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

   if(Math.ceil(residents/20) > 1){ // Agregan los botones al areglo solo si hay mas de 1 pagina
      for(let i=1; i<=Math.ceil(residents/20); i++){
         buttons.push(<button key={`button-${i}`} onClick={btnPage} data-id={i} className={`select_page-btn${i==1 ? " page-btn-active" : ""}`} >{i}</button>)
      }
   }

   return (
      <div onClick={(e)=> e.target.dataset.id} className="select_page">
         {buttons.slice(numbers.start, numbers.limit)}
      </div>
   )
}
export default SelectPage