import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import type { Client } from "../types/client";

const demoClients: Client[] = [
  {
    id: "c1",
    name: "Comercial El Buen Café",
    document: "123456-7",
    phone: "5555-1234",
    email: "contacto@buen-cafe.com",
    address: "Ciudad",
    type: "mayorista",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [clients] = useState<Client[]>(demoClients);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) =>
      `${c.name} ${c.document ?? ""} ${c.type}`
        .toLowerCase()
        .includes(q)
    );
  }, [clients, query]);

  return (
    <Layout title="Clientes">
      <p>Gestión básica de clientes (MVP).</p>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, documento o tipo..."
          style={{ padding: 8, width: 360 }}
        />
        <button style={{ padding: "8px 12px" }} disabled>
          + Nuevo (próximo paso)
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {["Nombre", "Documento", "Tipo", "Activo"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #444",
                  padding: "8px 6px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td style={{ padding: "8px 6px" }}>{c.name}</td>
              <td style={{ padding: "8px 6px" }}>{c.document}</td>
              <td style={{ padding: "8px 6px" }}>{c.type}</td>
              <td style={{ padding: "8px 6px" }}>
                {c.isActive ? "Sí" : "No"}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 10, opacity: 0.8 }}>
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}