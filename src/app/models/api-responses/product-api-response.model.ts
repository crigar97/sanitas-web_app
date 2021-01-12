import { Product } from "../product.model";

export interface ProductApiResponse {
  data: Product[] | Product;
}