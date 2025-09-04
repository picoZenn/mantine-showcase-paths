import {
  Container,
  Title,
  Text,
  Image,
  Badge,
  Group,
  Button,
  Stack,
  Divider,
  ActionIcon,
  Tooltip,
  Avatar,
  Paper,
  Anchor,
} from '@mantine/core';
import { 
  IconArrowLeft, 
  IconHeart, 
  IconShare, 
  IconCalendar, 
  IconClock, 
  IconUser,
  IconTag 
} from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '@/hooks/useBlogs';
import { useState, useEffect } from 'react';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getBlogBySlug, loading } = useBlogs();
  const [isLiked, setIsLiked] = useState(false);
  const [blog, setBlog] = useState(getBlogBySlug(slug));

  useEffect(() => {
    if (slug) {
      const foundBlog = getBlogBySlug(slug);
      setBlog(foundBlog);
      
      if (!foundBlog && !loading) {
        navigate('/404');
      }
    }
  }, [slug, getBlogBySlug, loading, navigate]);

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <Text>Blog not found</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Navigation */}
        <Group>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/blogs')}
          >
            Back to Blog List
          </Button>
        </Group>

        {/* Hero Image */}
        <Image
          src={blog.image}
          alt={blog.title}
          radius="md"
          style={{ maxHeight: 400, objectFit: 'cover' }}
        />

        {/* Article Header */}
        <Stack gap="md">
          <Badge size="lg" variant="light" color="blue">
            {blog.category}
          </Badge>

          <Title order={1} size="2.5rem" fw={900}>
            {blog.title}
          </Title>

          <Text size="xl" c="dimmed" lineClamp={2}>
            {blog.shortDescription}
          </Text>

          {/* Author and Meta Info */}
          <Paper p="md" radius="md" bg="gray.0">
            <Group justify="space-between" wrap="wrap">
              <Group>
                <Avatar size="md" radius="xl">
                  <IconUser size={20} />
                </Avatar>
                <div>
                  <Text fw={500}>{blog.author}</Text>
                  <Group gap="xs" c="dimmed">
                    <IconCalendar size={14} />
                    <Text size="sm">
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </Group>
                </div>
              </Group>

              <Group>
                <Group gap="xs" c="dimmed">
                  <IconClock size={14} />
                  <Text size="sm">{blog.readTime} min read</Text>
                </Group>

                <Group gap="xs">
                  <Tooltip label="Like this article">
                    <ActionIcon
                      variant={isLiked ? 'filled' : 'subtle'}
                      color="red"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <IconHeart size={18} />
                    </ActionIcon>
                  </Tooltip>
                  
                  <Tooltip label="Share article">
                    <ActionIcon variant="subtle" color="gray">
                      <IconShare size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            </Group>
          </Paper>

          {/* Tags */}
          <Group>
            <IconTag size={16} />
            <Group gap="xs">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Group>
        </Stack>

        <Divider />

        {/* Article Content */}
        <Stack gap="lg">
          <div>
            <Text size="lg" style={{ lineHeight: 1.8 }}>
              {blog.content}
            </Text>
          </div>

          {/* Extended content for demonstration */}
          <Text size="md" style={{ lineHeight: 1.7 }}>
            This is additional content to demonstrate the full article layout. In a real application, 
            this would be the complete blog post content with proper formatting, images, code blocks, 
            and other rich media elements.
          </Text>

          <Text size="md" style={{ lineHeight: 1.7 }}>
            You could extend this further by adding features like:
          </Text>

          <ul style={{ paddingLeft: '2rem' }}>
            <li><Text>Comments section</Text></li>
            <li><Text>Related articles</Text></li>
            <li><Text>Social sharing buttons</Text></li>
            <li><Text>Reading progress indicator</Text></li>
            <li><Text>Table of contents</Text></li>
          </ul>
        </Stack>

        <Divider />

        {/* Article Actions */}
        <Group justify="space-between">
          <Group>
            <Text size="sm" c="dimmed">
              Did you enjoy this article?
            </Text>
            <Group gap="xs">
              <Button
                variant={isLiked ? 'filled' : 'outline'}
                leftSection={<IconHeart size={16} />}
                color="red"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button variant="outline" leftSection={<IconShare size={16} />}>
                Share
              </Button>
            </Group>
          </Group>

          <Group>
            <Button
              variant="light"
              onClick={() => navigate('/blogs')}
            >
              More Articles
            </Button>
          </Group>
        </Group>

        {/* Author Bio */}
        <Paper p="xl" radius="md" bg="blue.0">
          <Group align="flex-start">
            <Avatar size="lg" radius="xl">
              <IconUser size={24} />
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text fw={600} size="lg">About {blog.author}</Text>
              <Text c="dimmed" mt="xs">
                {blog.author} is a passionate writer and expert in {blog.category.toLowerCase()}. 
                Follow their journey and discover more insights in their articles.
              </Text>
              <Group mt="md">
                <Anchor href="#" size="sm">
                  View Profile
                </Anchor>
                <Anchor href="#" size="sm">
                  More Articles
                </Anchor>
              </Group>
            </div>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
};

export default BlogDetail;