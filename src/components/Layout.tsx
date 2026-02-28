import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
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
          {/* Por ahora son “botones” sin router */}
          <button style={{ textAlign: "left", padding: 10 }}>📦 Productos</button>
          <button style={{ textAlign: "left", padding: 10 }} disabled>
            👤 Clientes (próximo)
          </button>
          <button style={{ textAlign: "left", padding: 10 }} disabled>
            🧾 Ventas (próximo)
          </button>
          <button style={{ textAlign: "left", padding: 10 }} disabled>
            🏭 Producción (próximo)
          </button>
          <button style={{ textAlign: "left", padding: 10 }} disabled>
            📊 Dashboard (próximo)
          </button>
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