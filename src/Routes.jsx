import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import Contacts from "./pages/contatos/contacts";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}
