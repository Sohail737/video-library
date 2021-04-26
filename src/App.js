import "./App.css";
import { AccountDetail, Login, Nav, Signup, Toast } from "./components/index";
import { Home, VideoDetail, Library, Account } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { useToast } from "./context";
import { PrivateRoute } from "./PrivateRoutes";


function App() {
  const { toastMessage, toastType } = useToast();
  return (
    <div className="App">
      <Nav />
      <Toast message={toastMessage} type={toastType} duration={3000} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/videos" element={<Home />}></Route>
        <Route path="/watch/:id" element={<VideoDetail />}></Route>
        <PrivateRoute path="/library" element={<Library />}></PrivateRoute>
        <Route path="/account" element={<Account />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <PrivateRoute path="details" element={<AccountDetail />}></PrivateRoute>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
