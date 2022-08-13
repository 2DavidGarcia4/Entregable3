import React from "react"

function SuggestedOption({option, optionClick}){
   return (
      <li key={option.id} onClick={optionClick} className="autocomp_option" data-id={option.id}>
         {option.start}
         <span>{option.span}</span>
         {option.end}
      </li>
   )
}
export default SuggestedOption