import { useState } from 'react'
import Card from './components/Card.jsx'
import Loader from './components/loader.jsx'
import Seeker from './components/Seeker.jsx'
import Location from './components/Location.jsx'
import SelectPage from './components/SelectPage.jsx'
import useFetch from './hoocks/useFetch.js'
import './App.css'

function App() {
  const [id, getId] = useState(false)
  const [numbersCards, setNumbersCards] = useState({start: 0, limit: 20})
  const {getDimension} = useFetch()
  const dimension = getDimension(id, setNumbersCards)
  const [loading, setLoading] = useState(true)
  setTimeout(()=> setLoading(false), 3000)
  
  // console.log(!loading || dimension==null)
  return (
    <div className="App">
      {(loading || !dimension) && <Loader/>}
      {!(loading || !dimension) && <div className="header">
        <Seeker getId={getId} setLoading={setLoading} />
        {dimension ? <Location location={dimension}/> : null}
      </div>}
      {/* <div className="header">
        <Seeker getId={getId} setLoading={setLoading} />
        {dimension ? <Location location={dimension}/> : null}
      </div> */}
      <div className="cards">
        {dimension?.residents.slice(numbersCards.start, numbersCards.limit).map(resident=> <Card key={resident.match(/(\d+)/g).shift()} url={resident} />)}
      </div>
      {!(loading || !dimension) && <SelectPage residents={dimension.residents.length} setNumbersCards={setNumbersCards} />}
    </div>
  )
}

export default App