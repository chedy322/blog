
import './App.css';
import Post from './Pages.js/home.js'
import Header from './component.js/header.js'
import Layout from './Layout.js'
import Home from './Pages.js/home.js'
import Register from './Pages.js/Register.js'
import Login from './Pages.js/Login.js'
import  {Routes, Route} from 'react-router-dom'
import Context from './Pages.js/context.js'
import Create from './Pages.js/Create.js';
import EditPost from './Pages.js/EditPost.js';
import Public from './component.js/Public.js';
import SeePost from './component.js/SeePost.js';

function App() {
  return (
    <Context>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* //home will be for public user/// */}
          <Route index element={<Public/>}/>
          <Route path={'/:id'} element={<SeePost/>}/>
          <Route path={'/login'} element={
          <Login/>
          }/>
          <Route path={'/register'} element={
          <Register/>
          }/>
          
          {/* this for his own profile */}
          <Route path={'/profile'} element={<Home />} />
            
          <Route path={'edit/:id'} element={<EditPost/>} />
          <Route path={'/create' }element={<Create />} />
          </Route>
       
        
   
        </Routes>
    </Context>
      


      
   
    
   
  );
}

export default App;
