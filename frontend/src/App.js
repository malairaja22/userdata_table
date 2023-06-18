import './App.css';
import { Userinput } from './components/userinput';
import { Userdetails } from './components/userdetails';
import {Route,Routes,Link,BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
     <nav>
      <Link to="/">User Input</Link>
      <Link to="/userdetails">User Details</Link>
     </nav>
     <Routes>
      <Route path="/" element={<Userinput />}></Route>
      <Route path="/userdetails" element={<Userdetails />}></Route>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
