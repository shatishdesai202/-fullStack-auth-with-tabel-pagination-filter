import { useState } from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRouter, { isAuthenticated } from "./services/PrivateRouter";

const Layout = ({ children, isLogin, setIsLogin, userInfo }) => {
  return (
    <div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} />
      <div>{children}</div>
    </div>
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(isAuthenticated());
  const userInfo = sessionStorage.getItem("userData");

  return (
    <div className="App">
      <Routers>
        <Layout isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo}>
          <Routes>
            <Route
              path="/login"
              element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
          </Routes>
        </Layout>
      </Routers>
    </div>
  );
}

export default App;
