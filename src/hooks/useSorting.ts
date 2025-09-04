import { useState, useMemo } from 'react';
import { Blog } from '@/data/blogs';

export type SortOption = 'newest' | 'oldest' | 'title';

export const useSorting = (blogs: Blog[]) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

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