import { useState } from 'react'
import Seeker from './components/Seeker.jsx'
import Location from './components/Location.jsx'
import Card from './components/Card.jsx'
import SelectPage from './components/SelectPage.jsx'
import useFetch from './hoocks/useFetch.js'
import './App.css'

function App() {
  const [id, getId] = useState(false)
  const [numbersCards, setNumbersCards] = useState({start: 0, limit: 20})
  const {getDimension} = useFetch()
  const dimension = getDimension(id, setNumbersCards)
  
  return (
    <div className="App">
      <div className="header">
        <Seeker getId={getId} />
        {dimension ? <Location location={dimension}/> : null}
      </div>
      <div className="cards">
        {dimension?.residents.slice(numbersCards.start, numbersCards.limit).map(resident=> <Card key={resident.match(/(\d+)/g).shift()} url={resident} />)}
      </div>
      {dimension && <SelectPage residents={dimension.residents.length} setNumbersCards={setNumbersCards} />}
      <div className="container">
      </div>
    </div>
  )
}

export default App