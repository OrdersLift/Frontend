import { Truck, Zap, Link, Shield, Clock, MapPin } from 'lucide-react';

const DeliveryIntegrationModal = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Truck className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Direct Delivery Integration
        </h3>
        <p className="text-gray-600">
          Seamlessly connect with major delivery platforms and manage all orders from one unified dashboard.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Link className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Multi-Platform Integration</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Connect with Swiggy, Zomato, Dunzo, UberEats, and local delivery services through a single interface.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Zap className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Real-Time Order Sync</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Orders from all platforms appear instantly in your dashboard with automatic status updates and tracking.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Shield className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Secure Payment Processing</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Handle payments securely across all platforms with automatic reconciliation and detailed financial reports.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <MapPin className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Smart Route Optimization</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Optimize delivery routes, reduce delivery times, and improve customer satisfaction with intelligent routing.
          </p>
        </div>
      </div>

      {/* Integration Process */}
      <div className="bg-primary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Integration Process</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              1
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Platform Connection</h5>
              <p className="text-gray-600 text-sm">We connect your restaurant to all major delivery platforms using secure APIs and authentication.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              2
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Menu Synchronization</h5>
              <p className="text-gray-600 text-sm">Your menu is automatically synced across all platforms with real-time updates for availability and pricing.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              3
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Unified Dashboard</h5>
              <p className="text-gray-600 text-sm">Manage all orders, track deliveries, and monitor performance from one centralized dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Supported Platforms</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 font-bold text-lg">S</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Swiggy</span>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-red-600 font-bold text-lg">Z</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Zomato</span>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold text-lg">D</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Dunzo</span>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold text-lg">U</span>
            </div>
            <span className="text-sm font-medium text-gray-700">UberEats</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Time Savings</h5>
            <p className="text-gray-600 text-sm">Manage all platforms from one dashboard, saving hours daily</p>
          </div>
          <div className="text-center p-4">
            <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Faster Delivery</h5>
            <p className="text-gray-600 text-sm">Optimized routes and real-time tracking improve delivery times</p>
          </div>
          <div className="text-center p-4">
            <Zap className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Increased Reach</h5>
            <p className="text-gray-600 text-sm">Access customers from multiple platforms simultaneously</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryIntegrationModal; 