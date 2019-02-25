const anecdotes=  
[
  {
    id:1,
    content: 'If it hurts, do it more often.',
    votes: 0,
    selected: true
  },
 {
   id: 2,
   content:  'Adding manpower to a late software project makes it later!',
   votes: 0,
   selected: false
 },
 {
   id:3,
   content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
   votes: 0,
   selected: false
 },
 {
    id:4,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes:0,
    selected: false
 },
 {
   id:5,
   content:  'Premature optimization is the root of all evil.',
   votes: 0,
   selected: false
 },
 {
    id:5,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes:0,
    selected: false
}  
]
    
const voteReducer = (state = anecdotes, action) => {
    const random =  Number(Math.floor(Math.random() *( anecdotes.length-1)))
    switch(action.type) {        
        case 'NEXT':   
            console.log('changen random luku', random)             
            const lastAnec= state.find(anec => anec.selected)            
            const lastUnTrue = { ...lastAnec, selected: false}
            const middleState = state.map(anec => anec.id !== lastAnec.id ? anec : lastUnTrue)
            const nextToBeAnec = state[random]
            const nextToTrue =  { ...nextToBeAnec, selected: true}    
            return middleState.map(anec => anec.id !== nextToBeAnec.id ? anec : nextToTrue)  
            //return anecdotes[random]
        case 'VOTE':
            const id = action.data.id
            console.log('voten action data id', id)
            console.log('voten saama state', state)
            const anecToChange = state.find(n => n.id === id)
            console.log('anectoChange', anecToChange)
            const changedAnec = { ...anecToChange, votes: (anecToChange.votes+1)}
            console.log('changedAnec', changedAnec)
            return state.map(anec => anec.id !== id ? anec : changedAnec )         
        default:   
        //return anecdotes[random]
        return state
    }
}

export default voteReducer