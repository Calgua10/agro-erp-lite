export type ProductCategory = "cafe" | "cacao" | "maiz" | "cardamomo" | "otro";

export type Unit = "kg" | "g" | "lb" | "qq" | "saco" | "unidad" | "litro";

export type Product = {
  id: string;        // id único (luego será uuid)
  name: string;      // nombre
  sku: string;       // código interno único
  category: ProductCategory;
  baseUnit: Unit;    // unidad base
  isActive: boolean;
  createdAt: string; // fecha ISO
  updatedAt: string; // fecha ISO
};