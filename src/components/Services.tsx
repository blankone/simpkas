import { serviceTypes, formatCurrency } from '../data';

export default function Services() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Layanan Kami</h1>
        <p className="text-gray-500 mt-1">Daftar layanan laundry yang tersedia</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceTypes.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{service.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{formatCurrency(service.pricePerKg)}</p>
                <p className="text-sm text-gray-500">per kilogram</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⏱️</span>
                <span>{service.name.includes('Express') ? '1 hari' : '2-3 hari'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>✨</span>
                <span>Garansi bersih & rapi</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🎉</span>
          <div>
            <h3 className="text-lg font-bold">Promo Spesial!</h3>
            <p className="text-blue-100 mt-1">Cuci lebih dari 10 kg, dapatkan diskon 15% untuk layanan Cuci Reguler!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
