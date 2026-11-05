import { Order, ServiceType } from './types';

export const serviceTypes: ServiceType[] = [
  { id: '1', name: 'Cuci Reguler', pricePerKg: 7000, icon: '👕' },
  { id: '2', name: 'Cuci Express', pricePerKg: 12000, icon: '⚡' },
  { id: '3', name: 'Dry Cleaning', pricePerKg: 25000, icon: '🧥' },
  { id: '4', name: 'Setrika Only', pricePerKg: 5000, icon: '👔' },
  { id: '5', name: 'Cuci Selimut', pricePerKg: 15000, icon: '🛏️' },
  { id: '6', name: 'Cuci Sepatu', pricePerKg: 35000, icon: '👟' },
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: { id: '1', name: 'Ahmad Rizki', phone: '081234567890', address: 'Jl. Merdeka No. 10' },
    items: [
      { id: '1', name: 'Cuci Reguler', quantity: 3, pricePerUnit: 7000 },
    ],
    status: 'dicuci',
    totalPrice: 21000,
    createdAt: '2026-01-15T08:00:00',
    estimatedCompletion: '2026-01-17T08:00:00',
    notes: 'Pakaian warna putih dipisahkan',
  },
  {
    id: 'ORD-002',
    customer: { id: '2', name: 'Siti Nurhaliza', phone: '082345678901', address: 'Jl. Sudirman No. 25' },
    items: [
      { id: '2', name: 'Cuci Express', quantity: 2, pricePerUnit: 12000 },
      { id: '4', name: 'Setrika Only', quantity: 1, pricePerUnit: 5000 },
    ],
    status: 'selesai',
    totalPrice: 29000,
    createdAt: '2026-01-14T10:00:00',
    estimatedCompletion: '2026-01-15T10:00:00',
    notes: '',
  },
  {
    id: 'ORD-003',
    customer: { id: '3', name: 'Budi Santoso', phone: '083456789012', address: 'Jl. Gatot Subroto No. 5' },
    items: [
      { id: '5', name: 'Cuci Selimut', quantity: 1, pricePerUnit: 15000 },
      { id: '3', name: 'Dry Cleaning', quantity: 1, pricePerUnit: 25000 },
    ],
    status: 'diterima',
    totalPrice: 40000,
    createdAt: '2026-01-16T09:00:00',
    estimatedCompletion: '2026-01-19T09:00:00',
    notes: 'Jas hitam, hati-hati',
  },
  {
    id: 'ORD-004',
    customer: { id: '4', name: 'Dewi Lestari', phone: '084567890123', address: 'Jl. Diponegoro No. 15' },
    items: [
      { id: '6', name: 'Cuci Sepatu', quantity: 2, pricePerUnit: 35000 },
    ],
    status: 'disetrika',
    totalPrice: 70000,
    createdAt: '2026-01-13T14:00:00',
    estimatedCompletion: '2026-01-16T14:00:00',
    notes: 'Sepatu putih dan hitam',
  },
  {
    id: 'ORD-005',
    customer: { id: '5', name: 'Rudi Hermawan', phone: '085678901234', address: 'Jl. Ahmad Yani No. 30' },
    items: [
      { id: '1', name: 'Cuci Reguler', quantity: 5, pricePerUnit: 7000 },
    ],
    status: 'diambil',
    totalPrice: 35000,
    createdAt: '2026-01-10T11:00:00',
    estimatedCompletion: '2026-01-12T11:00:00',
    notes: '',
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'diterima': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'dicuci': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'disetrika': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
    case 'diambil': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'diterima': return 'Diterima';
    case 'dicuci': return 'Sedang Dicuci';
    case 'disetrika': return 'Sedang Disetrika';
    case 'selesai': return 'Selesai';
    case 'diambil': return 'Sudah Diambil';
    default: return status;
  }
}

export function generateOrderId(): string {
  const num = Math.floor(Math.random() * 900) + 100;
  return `ORD-${num}`;
}
