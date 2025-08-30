import { MessageSquare, Bell, Users, Target, Zap, Heart } from 'lucide-react';

const CustomerEngagementModal = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <MessageSquare className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Smart Customer Engagement
        </h3>
        <p className="text-gray-600">
          Build lasting relationships with your customers through personalized communication and automated engagement campaigns.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Bell className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Automated Notifications</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Send personalized offers, order updates, and special promotions via WhatsApp, SMS, and email automatically.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Smart Segmentation</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Group customers by preferences, order history, and behavior to deliver highly targeted marketing campaigns.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Heart className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Loyalty Programs</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Reward repeat customers with points, discounts, and exclusive offers to increase retention and lifetime value.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Zap className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">AI-Powered Insights</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Analyze customer behavior to predict preferences and send timely, relevant offers that drive conversions.
          </p>
        </div>
      </div>

      {/* Engagement Channels */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Engagement Channels</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">WhatsApp</h5>
                <p className="text-sm text-gray-600">High engagement rate</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Order confirmations</li>
              <li>• Delivery updates</li>
              <li>• Special offers</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">SMS</h5>
                <p className="text-sm text-gray-600">Instant delivery</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Quick notifications</li>
              <li>• Promotional alerts</li>
              <li>• Reminder messages</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Email</h5>
                <p className="text-sm text-gray-600">Detailed content</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Newsletter campaigns</li>
              <li>• Detailed promotions</li>
              <li>• Customer surveys</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Campaign Examples */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Campaign Examples</h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">🎉 Happy Hour Alert</h5>
            <p className="text-gray-600 text-sm">Automatically notify customers about daily happy hour specials 30 minutes before they start.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">🎂 Birthday Specials</h5>
            <p className="text-gray-600 text-sm">Send personalized birthday offers to customers with a special discount on their favorite dishes.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">🔄 Re-engagement Campaign</h5>
            <p className="text-gray-600 text-sm">Reach out to customers who haven't ordered in 30+ days with a compelling comeback offer.</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">35%</div>
            <p className="text-gray-600 text-sm">Increase in repeat orders</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">2.5x</div>
            <p className="text-gray-600 text-sm">Higher customer lifetime value</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">60%</div>
            <p className="text-gray-600 text-sm">Reduction in customer churn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEngagementModal; 