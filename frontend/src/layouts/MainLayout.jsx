import React from "react";
import NavBar from "../components/navigation/NavBar";
import Footer from "../components/navigation/Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
