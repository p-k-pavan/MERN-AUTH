
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"

export default function App() {
  return( <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/sign-up" element={<SignUp/>} />
  </Routes>
  </BrowserRouter>
  )
}