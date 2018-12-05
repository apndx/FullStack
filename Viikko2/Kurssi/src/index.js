import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat : [ 
            {
                nimi:'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },       
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia : 7,
                id: 2
            },    
            {
                nimi:'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }
    return (
        <div>
          <Kurssi kurssi={kurssi} />
        </div>
    )
}

const Kurssi = ({kurssi}) => {

    console.log('kurssin saama props', kurssi)
    return (

        <div>
            <div>            
            <Otsikko  otsikko ={kurssi} />     
            </div>
            <div>
                <Sisalto sisalto ={kurssi.osat}/>       
            </div>
            <div>
                <Yhteensa yhteensa ={kurssi.osat}/>  
            </div>
        </div>
    )
}

const Otsikko = ({otsikko}) => {
    console.log('otsikon saama props', otsikko)
    return (
        <div>
           <h1> {otsikko.nimi}</h1>
        </div>
    )
}

const Sisalto = (osat) => {
    
    console.log('sisällön saama props', osat)
    return (  
        <ul>
        {osat.sisalto.map(osa=> <Osa key={osa.id} osa={osa}/>)}        
        </ul>
    )
}

const Osa = ({osa}) => {
    console.log('osan saama props', osa)
    return (
        <li>{osa.nimi} {osa.tehtavia}</li>
    )
}

const Yhteensa = (osat) => {
    const yht = osat.yhteensa.reduce((acc, osa) => acc + osa.tehtavia, 0);
    return (
        <div>
           <p>tehtäviä {yht} yhteensä </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
