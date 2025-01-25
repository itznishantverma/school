import { HelpCircle, Book, MessageCircle, Phone } from 'lucide-react';

export function Support() {
  const faqs = [
    {
      question: "How do I access my student portal?",
      answer: "You can access the student portal by clicking on the 'Login' button in the top navigation and entering your student credentials."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password."
    },
    {
      question: "How can I view my grades?",
      answer: "Once logged into the student portal, navigate to the 'Academics' section where you can view your current and past grades."
    },
    {
      question: "How do I contact my teachers?",
      answer: "You can message your teachers directly through the student portal or find their contact information in the Faculty directory."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Support & Help Center</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Find answers to common questions and get the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Start Chat
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Phone className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate assistance.</p>
              <p className="font-medium">(555) 123-4567</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Book className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
              <p className="text-gray-600 mb-4">Browse our help articles and guides.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
          <p className="text-center text-gray-600 mb-8">
            Submit a support ticket and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}