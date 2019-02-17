import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-dom/extend-expect' // nämä uudesta
import 'react-testing-library/cleanup-after-each' // nämä uudesta

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock