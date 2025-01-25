import { createClient } from '@supabase/supabase-js';
import { useAuth } from './useAuth';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function useStorage() {
  const { profile } = useAuth();

  const uploadFile = async (
    bucketName: string,
    file: File,
    path: string
  ) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file);

    if (error) throw error;
    return data;
  };

  const downloadFile = async (
    bucketName: string,
    path: string
  ) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(path);

    if (error) throw error;
    return data;
  };

  const deleteFile = async (
    bucketName: string,
    path: string
  ) => {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path]);

    if (error) throw error;
  };

  const getPublicUrl = (
    bucketName: string,
    path: string
  ) => {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);

    return data.publicUrl;
  };

  return {
    uploadFile,
    downloadFile,
    deleteFile,
    getPublicUrl
  };
}