import React from "react";
import "./App.css";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";

function App() {
  return (
    <div className="app">
      <div className="navbar">
       
          <Navbar />
      
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
           
              <Routes>
                <Route exact path="/cryptoverse" element={<HomePage />} />
                <Route path="/exchange" element={<Exchanges/>} />
                <Route path="/cryptocurriencies" element={<Cryptocurrencies/>} />
                <Route path="/crypto/:coinId" element={<CryptoDetails/>} />
                <Route path="/news" element={<News/>} />
              </Routes>
          
          </div>
        </Layout>

        <div className="footer">
        <Typography.Text
          level={5}
          style={{ color: "white", textAlign: "center" }}
        >
          Cryptoverse <br />
          All rights reserved
        </Typography.Text>
        <Space>
          <Link to="/cryptoverse">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
