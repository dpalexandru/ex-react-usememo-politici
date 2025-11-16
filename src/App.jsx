import React, { useState, useEffect, useMemo } from 'react'


//componente card
function Card({ data }) {
  console.log("card")
  const { name, image, position, biography } = data
  return (< div className="card" >
    <h2 className='card-title'>{name}</h2>
    <img className="card-img" src={image} alt="" />
    <p className='card-position' >Position: {position}</p>
    <p className='card-biography'>Biography: {biography}</p>
  </div >
  )
}

//componente card versione memoizata
const MemoizedCard = React.memo(Card)



function App() {
  //stati
  const [listaPolitici, setListaPolitici] = useState([])
  const [ricerca, setRicerca] = useState("");
  const [positions, setPosition] = useState("")

  //recupero lista politici
  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListaPolitici(data);
      })
      .catch(err => console.error(err));

  }, [])

  // Creo array posizioni con use memo 
  const posizioniUniche = useMemo(() => {

    return listaPolitici.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        return [...acc, p.position]
      }
      return acc;
    }, [])

  }, [listaPolitici]);


  // Array politici filtrati con useMemo
  const listaFiltrati = useMemo(() =>
    listaPolitici.filter(p =>
      (p.name.toLowerCase().includes(ricerca.toLowerCase()) ||
        p.biography.toLowerCase().includes(ricerca.toLowerCase()))
      &&
      (positions === "" || p.position.toLowerCase() === positions.toLowerCase())
    )
    , [listaPolitici, ricerca, positions]);

  return (
    <>
      <header>
        <h1 className='titolo-pagina'>Big Politicians</h1>
        <input
          placeholder='Cerca per nome o bio..'
          className='capo-ricerca'
          type="text"
          value={ricerca}
          onChange={e => setRicerca(e.target.value)}

        />
        <p className='filtra-posizione'>Filtra per positzione:</p>
        <select name="" id="select-position"
          value={positions}
          onChange={e => setPosition(e.target.value)}
        >
          <option value="">Tutti i politici</option>
          {posizioniUniche.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
      </header>
      <div className="cards-container">
        {listaFiltrati.map((p) => (
          <MemoizedCard
            data={p}
            key={p.id}
          />
        ))}

      </div>

    </>
  )
}

export default App
