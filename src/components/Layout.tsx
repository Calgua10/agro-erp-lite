import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  const location = useLocation(); 
  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          borderRight: "1px solid #333",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Agro ERP Lite</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>Offline · Desktop</div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            to="/productos"
            style={{
              textDecoration: "none",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: isActive("/productos") ? "#222" : "transparent",
              color: "inherit",
            }}
          >
            📦 Productos
          </Link>

          <Link
            to="/clientes"
            style={{
              textDecoration: "none",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: isActive("/clientes") ? "#222" : "transparent",
              color: "inherit",
            }}
          >
            👤 Clientes
          </Link>

          <Link
            to="/ventas"
            style={{
              textDecoration: "none",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: isActive("/ventas") ? "#222" : "transparent",
              color: "inherit",
            }}
          >
            🧾 Ventas
          </Link>

          <Link
            to="/produccion"
            style={{
              textDecoration: "none",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: isActive("/produccion") ? "#222" : "transparent",
              color: "inherit",
            }}
          >
            🏭 Producción
          </Link>

          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: isActive("/dashboard") ? "#222" : "transparent",
              color: "inherit",
            }}
          >
            📊 Dashboard
          </Link>
        </nav>

        <div style={{ marginTop: "auto", opacity: 0.7, fontSize: 12 }}>
          v0.1 · rama dev
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 16 }}>
        {title && <h1 style={{ marginTop: 0 }}>{title}</h1>}
        {children}
      </main>
    </div>
  );
}