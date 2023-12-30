import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />        
        <div className="max-w-screen-md mx-auto font-[Poppins] ">  
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} />   

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            
            {/* if all other routes, error  */}
            <Route path='*' element={<NotFound />}   />    
          </Routes>        
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
