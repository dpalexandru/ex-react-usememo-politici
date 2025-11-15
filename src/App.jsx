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

  return (
    <>
      {listaPolitici.map((p, i) => (
        <div className="card" key={i} >
          Nome: {p.name}
        </div>

      ))}

    </>
  )
}

export default App
