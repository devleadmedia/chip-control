import { Routes, Route } from "react-router-dom";

import { Header } from "@/components/header";
import { Home } from "@/pages/home";

export function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<p>Página não encontrada.</p>} />
      </Routes>
    </>
  );
}
