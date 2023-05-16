import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarcomp from './components/Navbarcomp';
import Addmarks from './components/addmarks';
import Detail from './components/details';
import Login from './components/login';
import Register from './components/register';
import Reset from './components/reset';

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
          <Route path='/' element={<Login />} />
          {/* <Route path='/addmarks' element={<Addmarks />} /> */}
          <Route path='/detail' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/dashboard' element={<Addmarks />} />

          <Route path='/reset' element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
