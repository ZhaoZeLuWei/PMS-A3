export interface Item {
  item_id: number;
  item_name: string;
  category: "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: "In Stock" | "Low Stock" | "Out of Stock" ;
  featured_item: 0 | 1;
  special_note ?: string;
}
