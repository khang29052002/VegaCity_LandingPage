import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import RegistrationForm from "./Components/RegistrationForm";
import Footer from "./Components/Footer";
import TermsAndConditions from "./Components/TermsAndConditions";
import Store from "./Components/Store";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Work />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/store" element={<Store />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
