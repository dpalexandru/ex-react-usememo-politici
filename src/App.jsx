import { useState, useEffect, useMemo } from 'react'


function App() {
  //stati
  const [listaPolitici, setListaPolitici] = useState([])
  const [ricerca, setRicerca] = useState("");

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


  //componente card
  function Card({ lista }) {
    return lista.map((p, i) => (
      <div className="card" key={i} >
        <h2 className='card-title'>{p.name}</h2>
        <img className="card-img" src={p.image} alt="" />
        <p className='card-position' >Position: {p.position}</p>
        <p className='card-biography'>Biography: {p.biography}</p>
      </div>
    ))
  }


  // Array politici filtrati con useMemo
  const listaFiltrati = useMemo(
    () => listaPolitici.filter((p) =>
      p.name.toLowerCase().includes(ricerca.toLowerCase())
      || p.biography.toLowerCase().includes(ricerca.toLowerCase())),
    [listaPolitici, ricerca]
  );


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
      </header>
      <div className="cards-container">
        <Card lista={listaFiltrati} />
      </div>

    </>
  )
}

export default App
