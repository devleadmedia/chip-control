import { NotFound } from "@/pages/404";
import { SignIn } from "@/pages/auth/signIn";
import { Routes, Route } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
