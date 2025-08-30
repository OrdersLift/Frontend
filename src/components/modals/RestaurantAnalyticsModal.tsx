import { BarChart3, TrendingUp, Users, Clock, Target, PieChart } from 'lucide-react';

const RestaurantAnalyticsModal = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Restaurant Analytics
        </h3>
        <p className="text-gray-600">
          Comprehensive analytics platform that provides deep insights into every aspect of your restaurant's performance.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Performance Tracking</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Monitor key performance indicators including sales, orders, customer satisfaction, and operational efficiency in real-time.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Users className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Customer Insights</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Understand customer behavior, preferences, and demographics to create targeted marketing strategies and improve service.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Operational Analytics</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Track kitchen efficiency, order processing times, delivery performance, and staff productivity to optimize operations.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Predictive Analytics</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Use AI-powered predictions to forecast demand, optimize inventory, and plan staffing based on historical data patterns.
          </p>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Orders</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-green-600">+18% this month</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Rating</span>
              <PieChart className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <div className="text-sm text-blue-600">+0.2 this week</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">New Customers</span>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-purple-600">+12% vs last week</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Order Time</span>
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24min</div>
            <div className="text-sm text-orange-600">-3min improvement</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Analytics Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Sales Analytics</h5>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Revenue trends and growth patterns</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Peak hours and seasonal analysis</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Menu item performance ranking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Profit margin optimization</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Customer Analytics</h5>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Customer lifetime value tracking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Order frequency and patterns</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Satisfaction score trends</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">Customer segmentation analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports & Insights */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Reports & Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-600 mb-1">Daily</div>
            <p className="text-gray-600 text-sm">Real-time performance updates and immediate insights</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-600 mb-1">Weekly</div>
            <p className="text-gray-600 text-sm">Comprehensive trend analysis and strategic recommendations</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-600 mb-1">Monthly</div>
            <p className="text-gray-600 text-sm">Deep-dive reports with actionable business insights</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">30%</div>
            <p className="text-gray-600 text-sm">Increase in operational efficiency</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">45%</div>
            <p className="text-gray-600 text-sm">Better resource allocation</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">2x</div>
            <p className="text-gray-600 text-sm">Faster decision making</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAnalyticsModal; 