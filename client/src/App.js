import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarcomp from './components/Navbarcomp';
import Addmarks from './components/addmarks';
import Home from './components/Home';
import Detail from './components/details';
import Login from './components/login';
import Signup from './components/signup';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div >
   <Navbarcomp />
    
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/addmarks' element={<Addmarks />} />
    <Route path='/detail' element={<Detail />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
   </Routes>
</BrowserRouter>
   </div>
  )
}

export default App;
