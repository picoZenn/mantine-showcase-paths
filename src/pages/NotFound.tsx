import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container size="sm" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper shadow="md" p="xl" radius="lg" w="100%" ta="center">
        <Stack gap="lg">
          <div>
            <Title order={1} size="5rem" fw={900} c="blue">
              404
            </Title>
            <Title order={2} size="2rem" fw={600} mt="md">
              Page Not Found
            </Title>
            <Text size="lg" c="dimmed" mt="xs">
              Oops! The page you're looking for doesn't exist.
            </Text>
          </div>
          
          <Text c="dimmed">
            The page <strong>{location.pathname}</strong> could not be found.
          </Text>

          <Stack gap="md" align="center">
            <Button
              leftSection={<IconHome size={16} />}
              size="lg"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
            
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NotFound;
