const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
  
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
  case 'GOOD':
    const better = {
      good: state.good+1,
      ok: state.ok,
      bad: state.bad
    }
    console.log('reducer muuttaa nyt hyvää', better)
    return better
  case 'OK':
    const ok = {
      good: state.good,
      ok: state.ok +1,
      bad: state.bad
    }
    console.log('reducer muuttaa nyt okta', ok)
    return ok
  case 'BAD':
    const bad = {
      good: state.good,
      ok: state.ok,
      bad: state.bad +1
    }
    console.log('reducer muuttaa nyt pahuutta', bad)
    return bad
  case 'ZERO':
    return initialState
  default:
    return state  
  }

}
  
export default counterReducer