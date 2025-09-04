import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconSearch, IconHome, IconDashboard, IconFileText } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { mockBlogs } from '@/data/blogs';

interface SearchSpotlightProps {
  opened: boolean;
  close: () => void;
}

const SearchSpotlight = ({ opened, close }: SearchSpotlightProps) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'home',
      label: 'Home',
      description: 'Go to home page',
      onClick: () => {
        navigate('/');
        close();
      },
      leftSection: <IconHome size={18} />,
    },
    {
      id: 'blogs',
      label: 'All Blogs',
      description: 'View all blog articles',
      onClick: () => {
        navigate('/blogs');
        close();
      },
      leftSection: <IconDashboard size={18} />,
    },
    ...mockBlogs.map((blog) => ({
      id: blog.id,
      label: blog.title,
      description: blog.shortDescription,
      onClick: () => {
        navigate(`/blogs/${blog.slug}`);
        close();
      },
      leftSection: <IconFileText size={18} />,
      keywords: [blog.category, blog.author, ...blog.tags],
    })),
  ];

  return (
    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch size={20} />,
        placeholder: 'Search blogs, categories, authors...',
      }}
    />
  );
};

export default SearchSpotlight;