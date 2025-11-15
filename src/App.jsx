import { useState, useEffect } from 'react'


function App() {
  const [listaPolitici, setListaPolitici] = useState([])

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
  function Card({ listaPolitici }) {

    return listaPolitici.map((p, i) => (

      <div className="card" key={i} >
        <h2 className='card-title'>{p.name}</h2>
        <img className="card-img" src={p.image} alt="" />
        <p className='card-position' >Position: {p.position}</p>
        <p className='card-biography'>Biography: {p.biography}</p>

      </div>
    ))


  }


  return (
    <>
      <h1 className='titolo-pagina'>Big Politicians</h1>
      <div className="cards-container">
        <Card listaPolitici={listaPolitici} />
      </div>

    </>
  )
}

export default App
