import { Order } from '../types';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '../data';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
}

const statusFlow: Order['status'][] = ['diterima', 'dicuci', 'disetrika', 'selesai', 'diambil'];

export default function OrderList({ orders, onUpdateStatus, onDeleteOrder }: OrderListProps) {
  const getNextStatus = (current: Order['status']): Order['status'] | null => {
    const idx = statusFlow.indexOf(current);
    if (idx < statusFlow.length - 1) return statusFlow[idx + 1];
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Pesanan</h1>
          <p className="text-gray-500 mt-1">Kelola semua pesanan laundry</p>
        </div>
        <span className="text-sm text-gray-500">{orders.length} pesanan</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['Semua', 'Diterima', 'Dicuci', 'Disetrika', 'Selesai', 'Diambil'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 text-sm rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Layanan</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => {
                const nextStatus = getNextStatus(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-medium text-blue-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <p key={item.id} className="text-sm text-gray-600">
                            {item.name} ({item.quantity} kg)
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-800">{formatCurrency(order.totalPrice)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {nextStatus && (
                          <button
                            onClick={() => onUpdateStatus(order.id, nextStatus)}
                            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                            title={`Ubah ke ${getStatusLabel(nextStatus)}`}
                          >
                            → {getStatusLabel(nextStatus)}
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">📭</span>
            <p className="text-gray-500 mt-3">Belum ada pesanan</p>
          </div>
        )}
      </div>
    </div>
  );
}
