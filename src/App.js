import './App.css';
import IndexPage from './pages/indexPage';
import Login from './pages/Login';
import {Routes,Route} from 'react-router-dom'
import Layout from './layout';
import Register from './pages/RegisterPage';
import CreatePost from './pages/createPost';
import { UserContextProvider } from './UserContext';
import PostPage from "./pages/postPage";
import EditPost from './pages/editPost';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
              <Route index element={<IndexPage/>}/>

              <Route path="/login" element={<Login />}/>

              <Route path="/register" element={<Register />}/>

              <Route path="/create" element={<CreatePost />}/>

              <Route path="/post/:id"  element={<PostPage />}/> 

              <Route path="/edit/:id"  element={<EditPost />}/> 
              
              
        </Route>
        
    </Routes>
    <Routes>
        <Route path="/logout" element={<Login/>}/>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
