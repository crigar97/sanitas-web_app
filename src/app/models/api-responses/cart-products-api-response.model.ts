import { CartProduct } from "../cart-product.model";

export interface CartProductsApiResponse {
  status: string;
  data: CartProduct[];
  error: string;
  statusCode: number;
}