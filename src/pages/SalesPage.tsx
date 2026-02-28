import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import type { Product } from "../types/product";
import type { Client } from "../types/client";
import type { SaleItem } from "../types/sales";

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
  {
    id: "p2",
    name: "Cacao en grano",
    sku: "CAC-GRANO",
    category: "cacao",
    baseUnit: "kg",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function money(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SalesPage() {
  const [clientId, setClientId] = useState(demoClients[0]?.id ?? "");
  const [productId, setProductId] = useState(demoProducts[0]?.id ?? "");
  const [qty, setQty] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  const [items, setItems] = useState<SaleItem[]>([]);

  const selectedClient = useMemo(
    () => demoClients.find((c) => c.id === clientId),
    [clientId]
  );

  const selectedProduct = useMemo(
    () => demoProducts.find((p) => p.id === productId),
    [productId]
  );

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + it.lineTotal, 0), [items]);
  const total = subtotal; // por ahora sin impuestos ni descuentos

  function addItem() {
    if (!selectedProduct) return;
    const q = Number.isFinite(qty) && qty > 0 ? qty : 1;
    const p = Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : 0;
    const lineTotal = q * p;

    const newItem: SaleItem = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      qty: q,
      unitPrice: p,
      lineTotal,
    };

    setItems((prev) => [...prev, newItem]);
  }

  function updateItem(id: string, patch: Partial<Pick<SaleItem, "qty" | "unitPrice">>) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const newQty = patch.qty ?? it.qty;
        const newPrice = patch.unitPrice ?? it.unitPrice;
        return {
          ...it,
          qty: newQty,
          unitPrice: newPrice,
          lineTotal: newQty * newPrice,
        };
      })
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <Layout title="Ventas">
      <p>Ventas (MVP): cliente + detalle + total. Luego conectaremos clientes/productos reales y SQLite.</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "12px 0" }}>
        <div style={{ minWidth: 280 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Cliente</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={{ padding: 8, width: "100%" }}
          >
            {demoClients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
            {selectedClient?.document ? `Documento: ${selectedClient.document}` : "—"}
          </div>
        </div>

        <div style={{ minWidth: 280 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Producto</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{ padding: 8, width: "100%" }}
          >
            {demoProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.sku} — {p.name}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
            UM: {selectedProduct?.baseUnit ?? "—"}
          </div>
        </div>

        <div style={{ minWidth: 120 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Cantidad</label>
          <input
            type="number"
            value={qty}
            min={0}
            step={0.01}
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ padding: 8, width: "100%" }}
          />
        </div>

        <div style={{ minWidth: 140 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Precio unit.</label>
          <input
            type="number"
            value={unitPrice}
            min={0}
            step={0.01}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            style={{ padding: 8, width: "100%" }}
          />
        </div>

        <div style={{ alignSelf: "end" }}>
          <button onClick={addItem} style={{ padding: "9px 14px" }}>
            + Agregar
          </button>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #333", marginTop: 12, paddingTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Detalle</h3>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {["Producto", "Cantidad", "Precio", "Total línea", ""].map((h) => (
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
            {items.map((it) => (
              <tr key={it.id}>
                <td style={{ padding: "8px 6px" }}>{it.productName}</td>

                <td style={{ padding: "8px 6px", width: 140 }}>
                  <input
                    type="number"
                    value={it.qty}
                    min={0}
                    step={0.01}
                    onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })}
                    style={{ padding: 6, width: "100%" }}
                  />
                </td>

                <td style={{ padding: "8px 6px", width: 160 }}>
                  <input
                    type="number"
                    value={it.unitPrice}
                    min={0}
                    step={0.01}
                    onChange={(e) => updateItem(it.id, { unitPrice: Number(e.target.value) })}
                    style={{ padding: 6, width: "100%" }}
                  />
                </td>

                <td style={{ padding: "8px 6px", width: 160 }}>{money(it.lineTotal)}</td>

                <td style={{ padding: "8px 6px", width: 80 }}>
                  <button onClick={() => removeItem(it.id)} style={{ padding: "6px 10px" }}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 10, opacity: 0.8 }}>
                  Aún no hay líneas. Agrega un producto arriba.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <div style={{ minWidth: 260, border: "1px solid #333", padding: 12, borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}