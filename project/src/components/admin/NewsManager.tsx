import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { News } from '../../types';

export function NewsManager() {
  const { newsManager } = useManagers();
  const [news, setNews] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await newsManager.getNews();
    setNews(data);
  };

  const handleEdit = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsEditing(true);
  };

  const handleDelete = async (newsId: string) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      await newsManager.deleteNews(newsId);
      loadNews();
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Published', accessor: (news: News) => news.published ? 'Yes' : 'No' },
    { header: 'Date', accessor: (news: News) => new Date(news.created_at).toLocaleDateString() },
    {
      header: 'Actions',
      accessor: (news: News) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(news)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(news.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News Management</h2>
        <button
          onClick={() => {
            setSelectedNews(null);
            setIsEditing(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </button>
      </div>

      <DataTable
        data={news}
        columns={columns}
      />

      {isEditing && (
        <NewsForm
          news={selectedNews}
          onClose={() => setIsEditing(false)}
          onSubmit={async (data) => {
            if (selectedNews) {
              await newsManager.updateNews(selectedNews.id, data);
            } else {
              await newsManager.createNews(data);
            }
            setIsEditing(false);
            loadNews();
          }}
        />
      )}
    </div>
  );
}

interface NewsFormProps {
  news: News | null;
  onClose: () => void;
  onSubmit: (data: Partial<News>) => Promise<void>;
}

function NewsForm({ news, onClose, onSubmit }: NewsFormProps) {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    published: news?.published || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {news ? 'Edit News' : 'Add News'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {news ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}