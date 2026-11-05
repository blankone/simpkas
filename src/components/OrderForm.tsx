import { useState } from 'react';
import { Order, LaundryItem, Customer } from '../types';
import { serviceTypes, formatCurrency, generateOrderId } from '../data';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  onCancel: () => void;
}

export default function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LaundryItem[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    if (!selectedService) return;
    const service = serviceTypes.find(s => s.id === selectedService);
    if (!service) return;

    const newItem: LaundryItem = {
      id: Date.now().toString(),
      name: service.name,
      quantity,
      pricePerUnit: service.pricePerKg,
    };
    setItems([...items, newItem]);
    setSelectedService('');
    setQuantity(1);
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) return;

    const customer: Customer = {
      id: Date.now().toString(),
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
    };

    const now = new Date();
    const estimated = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days

    const order: Order = {
      id: generateOrderId(),
      customer,
      items,
      status: 'diterima',
      totalPrice,
      createdAt: now.toISOString(),
      estimatedCompletion: estimated.toISOString(),
      notes,
    };

    onSubmit(order);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Pesanan Baru</h1>
        <p className="text-gray-500 mt-1">Isi data pelanggan dan layanan laundry</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">👤</span>
            Data Pelanggan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan nama pelanggan"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon *</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan alamat pelanggan"
              />
            </div>
          </div>
        </div>

        {/* Service Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm">🧺</span>
            Layanan Laundry
          </h3>

          {/* Add Item */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Pilih layanan...</option>
              {serviceTypes.map(service => (
                <option key={service.id} value={service.id}>
                  {service.icon} {service.name} - {formatCurrency(service.pricePerKg)}/kg
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Kg"
              />
              <span className="text-sm text-gray-500">kg</span>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Tambah
              </button>
            </div>
          </div>

          {/* Service Quick Select */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
            {serviceTypes.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedService(service.id);
                }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  selectedService === service.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="text-xl">{service.icon}</span>
                <p className="text-xs font-medium text-gray-700 mt-1">{service.name}</p>
                <p className="text-xs text-gray-500">{formatCurrency(service.pricePerKg)}/kg</p>
              </button>
            ))}
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Layanan</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Jumlah</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Harga</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Subtotal</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity} kg</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatCurrency(item.pricePerUnit)}/kg</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">{formatCurrency(item.quantity * item.pricePerUnit)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-blue-800 text-right">Total:</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-800 text-right">{formatCurrency(totalPrice)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <span className="text-3xl">🧺</span>
              <p className="mt-2 text-sm">Belum ada layanan ditambahkan</p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">📝</span>
            Catatan
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            rows={3}
            placeholder="Catatan tambahan (opsional)..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={!customerName || !customerPhone || items.length === 0}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💾 Simpan Pesanan
          </button>
        </div>
      </form>
    </div>
  );
}
