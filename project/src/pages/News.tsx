import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { Calendar, User } from 'lucide-react';

export function News() {
  const [news, setNews] = useState<any[]>([]);
  const db = useDatabase();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await db.fetchNews();
      setNews(data.filter(item => item.published));
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Latest News</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Stay updated with the latest happenings at EduExcel Academy
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {news.map((item, index) => (
              <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <div className="flex items-center text-gray-600 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    {item.author && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>{item.author.first_name} {item.author.last_name}</span>
                      </div>
                    )}
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}