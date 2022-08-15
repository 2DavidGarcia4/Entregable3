import { useState } from 'react'
import Loader from './components/Loader.jsx'
import Seeker from './components/Seeker.jsx'
import Location from './components/Location.jsx'
import SelectPage from './components/SelectPage.jsx'
import ResidentInfo from './components/ResidentInfo.jsx'
import useFetch from './hoocks/useFetch.js'
import './App.css'

function App() {
  const [id, getId] = useState(false) // Obtener el id de la location
  const [loading, setLoading] = useState(true) // Para que se active o desactive el loading
  const [actualButton, getActualButton] = useState(undefined) // Obtener el boton selecionado del paginado
  const [numbersCards, setNumbersCards] = useState({start: 0, limit: 20}) // La cantidad de cads que se mostraran en cada pagina
  const locations = useFetch().getLocations("https://rickandmortyapi.com/api/location") // Array de todas las localizaciones
  const dimension = useFetch().getDimension(id) // Dimencion
  setTimeout(()=> setLoading(false), 3000) // Para el loading
  
  return (
    <div className="App">
      {(loading || !dimension) && <Loader/>}

      {!(loading || !dimension) && (
        <div className="header">
          <Seeker getId={getId} getButton={getActualButton} locations={locations} />
          {dimension && <Location location={dimension}/>}
        </div>)
      }

      <div className="cards">
        {dimension?.residents.slice(numbersCards.start, numbersCards.limit).map(resident=> <ResidentInfo key={resident.match(/(\d+)/g).shift()} url={resident} />)}
      </div>

      {!(loading || !dimension) && <SelectPage residents={dimension.residents.length} setNumbersCards={setNumbersCards} button={[actualButton, getActualButton]} />}
    </div>
  )
}

export default App