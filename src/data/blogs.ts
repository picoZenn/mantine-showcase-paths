export interface Blog {
  id: string;
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  content: string;
  category: 'Tech' | 'Lifestyle' | 'Travel' | 'Food' | 'Fashion';
  date: string;
  author: string;
  readTime: number;
  tags: string[];
}

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    shortDescription: 'Exploring cutting-edge technologies shaping the future of web development.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Tech',
    date: '2024-01-15',
    author: 'John Doe',
    readTime: 5,
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: '2',
    title: 'Minimalist Living Guide',
    slug: 'minimalist-living-guide',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    shortDescription: 'Learn how to embrace minimalism and simplify your life.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Lifestyle',
    date: '2024-01-20',
    author: 'Jane Smith',
    readTime: 8,
    tags: ['Minimalism', 'Lifestyle', 'Productivity']
  },
  {
    id: '3',
    title: 'Hidden Gems of Tokyo',
    slug: 'hidden-gems-of-tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    shortDescription: 'Discover the secret spots and local favorites in Japan\'s capital.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    category: 'Travel',
    date: '2024-01-25',
    author: 'Mike Johnson',
    readTime: 6,
    tags: ['Tokyo', 'Travel', 'Japan', 'Culture']
  },
  {
    id: '4',
    title: 'Healthy Mediterranean Recipes',
    slug: 'healthy-mediterranean-recipes',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    shortDescription: 'Delicious and nutritious Mediterranean dishes for everyday cooking.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Food',
    date: '2024-02-01',
    author: 'Sarah Wilson',
    readTime: 4,
    tags: ['Mediterranean', 'Healthy', 'Recipes', 'Nutrition']
  },
  {
    id: '5',
    title: 'Sustainable Fashion Trends',
    slug: 'sustainable-fashion-trends',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    shortDescription: 'Eco-friendly fashion choices that don\'t compromise on style.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    category: 'Fashion',
    date: '2024-02-05',
    author: 'Emma Davis',
    readTime: 7,
    tags: ['Sustainable', 'Fashion', 'Eco-friendly', 'Trends']
  },
  {
    id: '6',
    title: 'AI and Machine Learning Basics',
    slug: 'ai-machine-learning-basics',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    shortDescription: 'A beginner-friendly introduction to AI and machine learning concepts.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Tech',
    date: '2024-02-10',
    author: 'Alex Chen',
    readTime: 9,
    tags: ['AI', 'Machine Learning', 'Technology', 'Beginners']
  }
];

export const categories = ['All', 'Tech', 'Lifestyle', 'Travel', 'Food', 'Fashion'] as const;

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
};