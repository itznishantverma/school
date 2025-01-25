import { useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { message, type, hideToast } = useToast();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, hideToast]);

  if (!message) return null;

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : Info;
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}>
      <Icon className="h-5 w-5" />
      <span>{message}</span>
      <button onClick={hideToast} className="ml-2">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}