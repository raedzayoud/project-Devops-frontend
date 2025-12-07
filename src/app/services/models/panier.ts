export interface PanierModel {
  totalPrice: number;
  client_id: number;
  user_id: number;
  produit: Produit[];
}

export interface Produit {
  product_id: number;
  price: number;
  quantity: number;
  total: number;
}
