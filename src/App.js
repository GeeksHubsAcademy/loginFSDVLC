
import './App.css';


import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Login/>
        <Profile/>
      
        <Routes>
          {/*<Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>*/}


        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
