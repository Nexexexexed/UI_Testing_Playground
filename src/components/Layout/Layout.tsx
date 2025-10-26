import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
