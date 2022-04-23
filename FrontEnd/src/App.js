/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 02:50:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <Navbar/>
          <Home/>
          <Footer/>
        </Route>
        <Route path="/login">
        <Navbar/>
          <Login/>
        </Route>
        <Route path="/register">
        <Navbar/>
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
