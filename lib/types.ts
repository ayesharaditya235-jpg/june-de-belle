export type OrderStatus =
  | "Waiting Confirmation"
  | "Payment Confirmed"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  product: string;
  variant: string;
  notes?: string;
  status: OrderStatus;
  created_at: string;
}

export interface ProductVariant {
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  nameId: string;
  price: string | null;
  description: string;
  material: string;
  dimensions: string;
  features: string[];
  variants: ProductVariant[];
  gradientFrom: string;
  gradientTo: string;
  badge?: string;
}

export interface OrderFormData {
  name: string;
  whatsapp: string;
  email: string;
  product: string;
  variant: string;
  notes: string;
}
