import { Product } from "./product.model";

export interface ProductResponse {
    message: string;
    data: Product[];
}