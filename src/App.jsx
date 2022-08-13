import { useState } from 'react'
import Loader from './components/loader.jsx'
import Seeker from './components/Seeker.jsx'
import Location from './components/Location.jsx'
import SelectPage from './components/SelectPage.jsx'
import ResidentInfo from './components/ResidentInfo.jsx'
import useFetch from './hoocks/useFetch.js'
import './App.css'

function App() {
  const [id, getId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actualButton, getActualButton] = useState(undefined)
  const [numbersCards, setNumbersCards] = useState({start: 0, limit: 20})
  const {getDimension} = useFetch()
  const dimension = getDimension(id, setNumbersCards)
  setTimeout(()=> setLoading(false), 3000)
  
  return (
    <div className="App">
      {(loading || !dimension) && <Loader/>}
      {!(loading || !dimension) && <div className="header">
        <Seeker getId={getId} getButton={getActualButton} />
        {dimension ? <Location location={dimension}/> : null}
      </div>}
      <div className="cards">
        {dimension?.residents.slice(numbersCards.start, numbersCards.limit).map(resident=> <ResidentInfo key={resident.match(/(\d+)/g).shift()} url={resident} />)}
      </div>
      {!(loading || !dimension) && <SelectPage residents={dimension.residents.length} setNumbersCards={setNumbersCards} button={[actualButton, getActualButton]} />}
    </div>
  )
}

export default App