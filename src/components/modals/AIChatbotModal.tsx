import { MessageCircle, Mic, Brain, Zap, Users, Clock } from 'lucide-react';

const AIChatbotModal = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <MessageCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          AI Menu Chatbot
        </h3>
        <p className="text-gray-600">
          Your restaurant's intelligent conversational assistant that understands natural language and provides instant menu information.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Mic className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Voice & Text Support</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Customers can interact through both voice commands and text messages. The chatbot reads menu items aloud and responds naturally to questions.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Brain className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Natural Language Processing</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Understands complex queries like "What's good for vegetarians?" or "Show me spicy dishes under $15" with contextual awareness.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Zap className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Instant Responses</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Provides immediate answers about ingredients, preparation methods, allergens, and dietary restrictions without human intervention.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center mb-3">
            <Users className="w-5 h-5 text-primary-600 mr-3" />
            <h4 className="font-semibold text-gray-900">Personalized Recommendations</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Learns from customer preferences and suggests dishes based on past orders, dietary restrictions, and current mood.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-primary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              1
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Menu Training</h5>
              <p className="text-gray-600 text-sm">We upload your complete menu and train the AI to understand your dishes, ingredients, and preparation methods.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              2
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Integration</h5>
              <p className="text-gray-600 text-sm">The chatbot is seamlessly integrated into your website with a friendly interface that matches your brand.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              3
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Live Interaction</h5>
              <p className="text-gray-600 text-sm">Customers can ask questions 24/7 and get instant, accurate responses about your menu and services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">24/7 Availability</h5>
            <p className="text-gray-600 text-sm">Never miss a customer inquiry, even outside business hours</p>
          </div>
          <div className="text-center p-4">
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Reduced Wait Times</h5>
            <p className="text-gray-600 text-sm">Instant responses eliminate customer frustration and improve satisfaction</p>
          </div>
          <div className="text-center p-4">
            <Zap className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900 mb-1">Increased Sales</h5>
            <p className="text-gray-600 text-sm">Better menu understanding leads to higher order values and repeat customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotModal; 