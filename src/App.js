import logo from './logo.svg';
import './App.css';
import {Login} from './screens/login.js'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import {Home} from './screens/homescreen.js'

function App() {
  return (
   <Router>
     <Routes>
       <Route path='/login' element={<Login />} exact /> 
       <Route path='/' element={<Home />} exact />
     </Routes>
   </Router>
  );
}

export default App;
