import { Paper, Group, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArticle, IconUser, IconTag, IconCalendar } from '@tabler/icons-react';
import { mockBlogs } from '@/data/blogs';

const BlogStats = () => {
  const totalBlogs = mockBlogs.length;
  const totalAuthors = new Set(mockBlogs.map(blog => blog.author)).size;
  const totalTags = new Set(mockBlogs.flatMap(blog => blog.tags)).size;
  const latestDate = new Date(Math.max(...mockBlogs.map(blog => new Date(blog.date).getTime())));

  const stats = [
    {
      title: 'Total Articles',
      value: totalBlogs.toString(),
      icon: IconArticle,
      color: 'blue',
    },
    {
      title: 'Authors',
      value: totalAuthors.toString(),
      icon: IconUser,
      color: 'green',
    },
    {
      title: 'Tags',
      value: totalTags.toString(),
      icon: IconTag,
      color: 'orange',
    },
    {
      title: 'Latest Post',
      value: latestDate.toLocaleDateString(),
      icon: IconCalendar,
      color: 'purple',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
      {stats.map((stat) => (
        <Paper key={stat.title} p="md" radius="md" withBorder>
          <Group>
            <ThemeIcon
              size="lg"
              variant="light"
              color={stat.color}
            >
              <stat.icon size={20} />
            </ThemeIcon>
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                {stat.title}
              </Text>
              <Text fw={700} size="lg">
                {stat.value}
              </Text>
            </div>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
};

export default BlogStats;