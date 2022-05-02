import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarcomp from './components/Navbarcomp';
import Addmarks from './components/addmarks';
import Home from './components/Home';
import Detail from './components/details';

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
   </Routes>
</BrowserRouter>
   </div>
  )
}

export default App;
