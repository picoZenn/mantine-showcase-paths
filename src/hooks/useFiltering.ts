import { useState, useMemo } from 'react';
import { Blog } from '@/data/blogs';

export const useFiltering = (blogs: Blog[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.shortDescription.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query)) ||
        blog.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchQuery]);

  return {
    filteredBlogs,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
};