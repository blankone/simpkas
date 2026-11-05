import { Order } from '../types';
import { formatCurrency } from '../data';

interface CustomersProps {
  orders: Order[];
}

export default function Customers({ orders }: CustomersProps) {
  // Extract unique customers from orders
  const customerMap = new Map<string, { customer: Order['customer']; orderCount: number; totalSpent: number }>();
  
  orders.forEach(order => {
    const existing = customerMap.get(order.customer.id);
    if (existing) {
      existing.orderCount++;
      existing.totalSpent += order.totalPrice;
    } else {
      customerMap.set(order.customer.id, {
        customer: order.customer,
        orderCount: 1,
        totalSpent: order.totalPrice,
      });
    }
  });

  const customers = Array.from(customerMap.values());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Data Pelanggan</h1>
        <p className="text-gray-500 mt-1">Daftar pelanggan yang pernah menggunakan layanan</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kontak</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Alamat</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Order</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Belanja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map(({ customer, orderCount, totalSpent }) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{customer.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{customer.address || '-'}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{orderCount}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(totalSpent)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {customers.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">👥</span>
            <p className="text-gray-500 mt-3">Belum ada data pelanggan</p>
          </div>
        )}
      </div>
    </div>
  );
}
