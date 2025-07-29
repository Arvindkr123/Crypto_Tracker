import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-6 py-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
