import { Order } from '../types';
import { formatCurrency, getStatusColor, getStatusLabel } from '../data';

interface DashboardProps {
  orders: Order[];
}

export default function Dashboard({ orders }: DashboardProps) {
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status !== 'diambil').length;
  const completedToday = orders.filter(o => o.status === 'selesai').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter(o => o.status === 'diterima').length;
  const inProgress = orders.filter(o => o.status === 'dicuci' || o.status === 'disetrika').length;

  const stats = [
    { label: 'Total Pesanan', value: totalOrders, icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Pesanan Aktif', value: activeOrders, icon: '🔄', color: 'from-purple-500 to-purple-600' },
    { label: 'Selesai Hari Ini', value: completedToday, icon: '✅', color: 'from-green-500 to-green-600' },
    { label: 'Total Pendapatan', value: formatCurrency(totalRevenue), icon: '💰', color: 'from-amber-500 to-amber-600' },
  ];

  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang di KSRi Laundry Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Pesanan</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-700">📥 Diterima</span>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">{pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-yellow-700">🧼 Dalam Proses</span>
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">{inProgress}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">✅ Selesai</span>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{completedToday}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pesanan Terbaru</h3>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">{order.id}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(order.totalPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
