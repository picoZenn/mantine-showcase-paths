import { useState, useEffect } from 'react';
import { Blog, mockBlogs } from '@/data/blogs';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setBlogs(mockBlogs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getBlogBySlug = (slug: string): Blog | undefined => {
    return blogs.find(blog => blog.slug === slug);
  };

  return {
    blogs,
    loading,
    error,
    getBlogBySlug,
  };
};