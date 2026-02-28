import { useMemo, useState } from "react";
import type { Product } from "../types/product";

const demoProducts: Product[] = [
  {
    id: "p1",
    name: "Café Arábica Pergamino",
    sku: "CAF-AR-PERG",
    category: "cafe",
    baseUnit: "kg",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [products] = useState<Product[]>(demoProducts);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Productos</h1>
      <p>Catálogo de productos (MVP). Luego lo conectaremos a la base de datos.</p>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, SKU o categoría..."
          style={{ padding: 8, width: 360 }}
        />
        <button style={{ padding: "8px 12px" }} disabled>
          + Nuevo (próximo paso)
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {["SKU", "Nombre", "Categoría", "UM", "Activo"].map((h) => (
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
          {filtered.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: "8px 6px" }}>{p.sku}</td>
              <td style={{ padding: "8px 6px" }}>{p.name}</td>
              <td style={{ padding: "8px 6px" }}>{p.category}</td>
              <td style={{ padding: "8px 6px" }}>{p.baseUnit}</td>
              <td style={{ padding: "8px 6px" }}>{p.isActive ? "Sí" : "No"}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 10, opacity: 0.8 }}>
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}