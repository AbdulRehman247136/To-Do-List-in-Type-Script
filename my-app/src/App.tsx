
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import SignUp from './page/signup/SignUp.tsx';
import Login from './page/Login/Login.tsx';
import MainPage from './page/mainpage/MainPage.tsx';


function App() {


  return (
  <Router>
    <Routes>
     <Route path='/' element={<MainPage/>}/>
      <Route path='/Signup' element={<SignUp/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
     
    </Router>
  )
}


export default App
