import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Admission() {
  const admissionSteps = [
    {
      title: "Submit Application",
      description: "Complete the online application form with all required information and documents."
    },
    {
      title: "Entrance Assessment",
      description: "Take the required entrance tests to evaluate academic readiness."
    },
    {
      title: "Interview",
      description: "Personal interview with our admissions team and faculty members."
    },
    {
      title: "Decision",
      description: "Receive admission decision within 2-3 weeks of completing all requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Admission Process</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Join our community of learners and begin your journey towards excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-500">Step {index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Admission Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Completed application form</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Academic transcripts from previous schools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Two letters of recommendation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Valid ID proof</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Academic Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Minimum GPA of 3.0</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Satisfactory entrance exam scores</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>English language proficiency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl text-gray-600 mb-8">Start your application process today</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}