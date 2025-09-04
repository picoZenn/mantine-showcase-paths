import {
  Container,
  Group,
  Title,
  Button,
  Tooltip,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const BlogHeader = ({ onSearchClick }) => {
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
        </Group>
      </Group>
    </Container>
  );
};

export default BlogHeader;