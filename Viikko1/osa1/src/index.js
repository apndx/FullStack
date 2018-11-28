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
          <Otsikko kurssi={kurssi.nimi} />
          <Sisalto osat={kurssi.osat}   />
          <Yhteensa osat={kurssi.osat}  />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            {props.kurssi}
        </div>
    )
}

const Sisalto = ({osat}) => {
    return (
   
        <ul>{osat.map(osa=><Osa key={osa.id} osa={osa}/>)}</ul>
    )
}

const Osa = ({osa}) => {
    return (
        <li>{osa.nimi} {osa.tehtavia}</li>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
          <p>tehtäviä {props.osat[0].tehtavia+props.osat[1].tehtavia+props.osat[2].tehtavia} yhteensä </p> 
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
