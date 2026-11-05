import { useState } from 'react';
import { Order } from './types';
import { initialOrders } from './data';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import Services from './components/Services';
import Customers from './components/Customers';

type Page = 'dashboard' | 'orders' | 'new-order' | 'services' | 'customers';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddOrder = (order: Order) => {
    setOrders([order, ...orders]);
    setCurrentPage('orders');
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: '📊' },
    { id: 'orders' as Page, label: 'Pesanan', icon: '📋' },
    { id: 'new-order' as Page, label: 'Pesanan Baru', icon: '➕' },
    { id: 'services' as Page, label: 'Layanan', icon: '🧺' },
    { id: 'customers' as Page, label: 'Pelanggan', icon: '👥' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      case 'orders':
        return <OrderList orders={orders} onUpdateStatus={handleUpdateStatus} onDeleteOrder={handleDeleteOrder} />;
      case 'new-order':
        return <OrderForm onSubmit={handleAddOrder} onCancel={() => setCurrentPage('orders')} />;
      case 'services':
        return <Services />;
      case 'customers':
        return <Customers orders={orders} />;
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">KSRi Laundry</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
                {item.id === 'orders' && (
                  <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    {orders.filter(o => o.status !== 'diambil').length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
              <p className="text-xs font-medium text-blue-800">KSRi Laundry</p>
              <p className="text-xs text-blue-600 mt-1">Bersih, Wangi, Cepat!</p>
              <p className="text-xs text-blue-500 mt-2">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
