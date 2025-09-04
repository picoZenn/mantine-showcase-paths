import {
  Container,
  Title,
  Grid,
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  Select,
  TextInput,
  Loader,
  Center,
  Stack,
  ActionIcon,
  Tooltip,
  Pagination,
  Affix,
  Transition,
  rem,
} from '@mantine/core';
import { IconSearch, IconCalendar, IconUser, IconClock, IconHeart, IconShare, IconArrowUp } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowScroll, useDisclosure } from '@mantine/hooks';
import { useBlogs } from '@/hooks/useBlogs';
import { useSorting } from '@/hooks/useSorting';
import { useFiltering } from '@/hooks/useFiltering';
import { usePagination } from '@/hooks/usePagination';
import { categories } from '@/data/blogs';
import BlogStats from '@/components/BlogStats';
import BlogHeader from '@/components/BlogHeader';
import SearchSpotlight from '@/components/SearchSpotlight';

const ITEMS_PER_PAGE = 6;

const BlogList = () => {
  const navigate = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  const [spotlightOpened, { open: openSpotlight, close: closeSpotlight }] = useDisclosure(false);
  
  const { blogs, loading, error } = useBlogs();
  const { filteredBlogs, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useFiltering(blogs);
  const { sortedBlogs, sortBy, setSortBy } = useSorting(filteredBlogs);
  
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedBlogs,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({
    data: sortedBlogs,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set());

  const handleLike = (blogId: string) => {
    setLikedBlogs(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(blogId)) {
        newLiked.delete(blogId);
      } else {
        newLiked.add(blogId);
      }
      return newLiked;
    });
  };

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '100vh' }}>
        <Text color="red">{error}</Text>
      </Center>
    );
  }

  return (
    <>
      <SearchSpotlight opened={spotlightOpened} close={closeSpotlight} />
      
      <BlogHeader onSearchClick={openSpotlight} />
      
      <Container size="xl" pb="xl">
        <Stack gap="xl">
          {/* Stats Section */}
          <BlogStats />

          {/* Header */}
          <div>
            <Title order={2} size="2rem" fw={700} ta="center" mb="md">
              Latest Articles
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={600} mx="auto">
              Discover amazing articles about technology, lifestyle, travel, and more
            </Text>
          </div>

        {/* Filters and Search */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <TextInput
              placeholder="Search blogs..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Select
              placeholder="Select category"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value || 'All')}
              data={categories.map(cat => ({ value: cat, label: cat }))}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
            <Select
              placeholder="Sort by"
              value={sortBy}
              onChange={(value) => setSortBy(value as any)}
              data={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'title', label: 'Title A-Z' },
              ]}
            />
          </Grid.Col>
        </Grid>

        {/* Results Info */}
        <Text c="dimmed">
          Showing {paginatedBlogs.length} of {sortedBlogs.length} articles
        </Text>

        {/* Blog Grid */}
        <Grid>
          {paginatedBlogs.map((blog) => (
            <Grid.Col key={blog.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Card.Section>
                  <Image
                    src={blog.image}
                    height={200}
                    alt={blog.title}
                  />
                </Card.Section>

                <Stack mt="md" gap="xs">
                  <Group justify="space-between" align="flex-start">
                    <Badge color="blue" variant="light">
                      {blog.category}
                    </Badge>
                    <Group gap={4}>
                      <Tooltip label="Like this article">
                        <ActionIcon
                          variant={likedBlogs.has(blog.id) ? 'filled' : 'subtle'}
                          color="red"
                          onClick={() => handleLike(blog.id)}
                        >
                          <IconHeart size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Share article">
                        <ActionIcon variant="subtle" color="gray">
                          <IconShare size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>

                  <Title order={3} size="h4" lineClamp={2}>
                    {blog.title}
                  </Title>

                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {blog.shortDescription}
                  </Text>

                  <Group justify="space-between" mt="auto" pt="md">
                    <Group gap="xs">
                      <IconUser size={14} />
                      <Text size="xs" c="dimmed">{blog.author}</Text>
                    </Group>
                    <Group gap="xs">
                      <IconClock size={14} />
                      <Text size="xs" c="dimmed">{blog.readTime} min</Text>
                    </Group>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Group gap="xs">
                      <IconCalendar size={14} />
                      <Text size="xs" c="dimmed">
                        {new Date(blog.date).toLocaleDateString()}
                      </Text>
                    </Group>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => navigate(`/blogs/${blog.slug}`)}
                    >
                      Read More
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Load More */}
        {totalPages > 1 && (
          <Center>
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={goToPage}
              size="lg"
              withEdges
            />
          </Center>
        )}

        {sortedBlogs.length === 0 && (
          <Center>
            <Text size="lg" c="dimmed">
              No articles found matching your criteria.
            </Text>
          </Center>
        )}
      </Stack>
    </Container>

    {/* Scroll to top button */}
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftSection={<IconArrowUp size={16} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  </>
  );
};

export default BlogList;