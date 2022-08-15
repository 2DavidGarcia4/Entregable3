import React, {useState, useEffect} from "react";
import useFetch from "../hoocks/useFetch";

const emojis = { // Emojis para el estado del residente
   "alive": "🟢",
   "dead": "🔴",
   "unknown": "⚪"
}

function ResidentInfo({url}){
   const resident = useFetch().getResident(url)
   
   if(resident){
      return (
         <div className="card" title={resident.name}>
            <div className="state">
               <p>{`${emojis[resident.status.toLowerCase()]} ${resident.status}`}</p>
            </div>
            <img src={resident?.image} alt={`${resident.name}-img`} />
            <div className="card_characters">
               <h3>{resident.name}</h3>
               <p><span>Race:</span> {resident.species}</p>
               <p><span>Origin:</span> {resident.location.name}</p>
               <p><span>Appearance in episodes:</span> {resident.episode.length}</p>
            </div>
         </div>
      )
   }
}
export default ResidentInfo