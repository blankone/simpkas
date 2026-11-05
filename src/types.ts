export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface LaundryItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export type OrderStatus = 'diterima' | 'dicuci' | 'disetrika' | 'selesai' | 'diambil';

export interface Order {
  id: string;
  customer: Customer;
  items: LaundryItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  estimatedCompletion: string;
  notes: string;
}

export interface ServiceType {
  id: string;
  name: string;
  pricePerKg: number;
  icon: string;
}
