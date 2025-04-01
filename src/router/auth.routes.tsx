import { SignIn } from "@/pages/signIn";
import { Routes, Route } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<p>Página não encontrada.</p>} />
    </Routes>
  );
}
