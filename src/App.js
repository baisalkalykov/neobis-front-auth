import { Route,Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

function App() {
  return (
   <>
    <Routes>
    <Route path='/' element={<Login/>}/>  
    <Route path='/registration' element={<Registration/>}/>
    </Routes>
   </>
  );
}

export default App;