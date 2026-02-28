import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import Layout from "../components/Layout";
import ClientsPage from "../pages/ClientsPage";

function Placeholder({ title }: { title: string }) {
  return (
    <Layout title={title}>
      <p>Pantalla en construcción.</p>
    </Layout>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/clientes" element={<ClientsPage />} />
      <Route path="/ventas" element={<Placeholder title="Ventas" />} />
      <Route path="/produccion" element={<Placeholder title="Producción" />} />
      <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
      <Route path="*" element={<Placeholder title="No encontrado" />} />
    </Routes>
  );
}