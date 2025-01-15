import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Event from './pages/eventmanagement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/events" element={<Event/>}/>
      </Routes>
    </Router>
  );
}

export default App;
