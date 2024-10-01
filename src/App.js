import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';
import Homepage from './pages/Homepage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connectpage from './pages/Connectpage.jsx';
import './App.css';

function App() {
  return (
    <div  className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/connect' element={<Connectpage />} />
        </Routes>
        
        
      </BrowserRouter>
    </div>
      
  );
}

export default App;
