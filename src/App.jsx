import { useEffect, useState } from 'react'
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
  // console.log(dimension?.residents)

  // console.log("hola que tal 12".match(/(\d+)/g).shift())
  
  // console.log(dimension?.residents.slice(numbersCards.start, numbersCards.limit).length)
  
  return (
    <div className="App">
      <div className="header">
        <Seeker getId={getId} />
        {dimension ? <Location location={dimension}/> : null}
      </div>
      <div className="cards">
        {dimension?.residents.slice(numbersCards.start, numbersCards.limit).map(resident=> <Card key={resident.match(/(\d+)/g).shift()} url={resident} />)}
      </div>
      {dimension && <SelectPage residents={dimension.residents.length} numbersCards={numbersCards} setNumbersCards={setNumbersCards} />}
      <div className="container">
      </div>
    </div>
  )
}

export default App