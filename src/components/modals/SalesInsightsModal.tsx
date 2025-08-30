import { BarChart3, TrendingUp, DollarSign, Calendar, Target, PieChart } from 'lucide-react';

const SalesInsightsModal = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Sales Insights Dashboard
        </h3>
        <p className="text-gray-600">
          Transform raw data into actionable insights. Make informed decisions about your menu, pricing, and business strategy.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Performance Analytics</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Track sales trends, identify peak hours, and understand customer behavior patterns with real-time data visualization.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <DollarSign className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Profit Margin Analysis</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Calculate exact profit margins for each dish, identify your most profitable items, and optimize pricing strategies.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Seasonal Trends</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Discover seasonal patterns, plan menu changes, and prepare for peak periods with historical data analysis.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Goal Tracking</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Set sales targets, track progress, and receive alerts when you're ahead or behind your business goals.
          </p>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Today's Sales</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">$2,847</div>
            <div className="text-sm text-green-600">+12% vs yesterday</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Top Seller</span>
              <PieChart className="w-4 h-4 text-primary-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">Butter Chicken</div>
            <div className="text-sm text-gray-600">23 orders today</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Order Value</span>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">$34.50</div>
            <div className="text-sm text-blue-600">+8% this week</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics You'll Track</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Daily, weekly, and monthly sales reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Best and worst performing menu items</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Customer order patterns and preferences</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Peak ordering hours and days</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Inventory usage and waste tracking</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span className="text-gray-700">Revenue growth and trend analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">25%</div>
            <p className="text-gray-600 text-sm">Average increase in profit margins</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">40%</div>
            <p className="text-gray-600 text-sm">Reduction in food waste</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">3x</div>
            <p className="text-gray-600 text-sm">Faster decision making</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInsightsModal; 