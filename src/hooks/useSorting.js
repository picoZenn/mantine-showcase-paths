import { useState, useMemo } from 'react';

export const useSorting = (blogs) => {
  const [sortBy, setSortBy] = useState('newest');

  const sortedBlogs = useMemo(() => {
    const sorted = [...blogs];

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [blogs, sortBy]);

  return {
    sortedBlogs,
    sortBy,
    setSortBy,
  };
};