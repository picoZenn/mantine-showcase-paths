import {
  Container,
  Group,
  Title,
  Button,
  ActionIcon,
  useMantineColorScheme,
  Tooltip,
} from '@mantine/core';
import { IconSearch, IconSun, IconMoon } from '@tabler/icons-react';

interface BlogHeaderProps {
  onSearchClick: () => void;
}

const BlogHeader = ({ onSearchClick }: BlogHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" align="center">
        <Title order={1} size="2rem" fw={900} c="blue">
          Modern Blog
        </Title>

        <Group>
          <Tooltip label="Search articles">
            <Button
              variant="subtle"
              leftSection={<IconSearch size={16} />}
              onClick={onSearchClick}
            >
              Search
            </Button>
          </Tooltip>

          <Tooltip label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}>
            <ActionIcon
              onClick={toggleColorScheme}
              variant="outline"
              size="lg"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Container>
  );
};

export default BlogHeader;