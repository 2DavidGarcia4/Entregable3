import React from "react";

function Location({location}){
   return(
      <div className="location">
         <h2>{location.name}</h2>
         <div className="location_options">
            <p><span>Type:</span> {location.type}</p>
            <p><span>Dimension:</span> {location.dimension}</p>
            <p><span>Population:</span> {location.residents.length}</p>
         </div>
      </div>
   )
}
export default Location