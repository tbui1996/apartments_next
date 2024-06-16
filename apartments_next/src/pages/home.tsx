// pages/home.tsx
import { signOut } from 'next-auth/react';
import { Button, Container, Typography, Box } from '@mui/material';
import Layout from '@/components/Layout';

const HomePage: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h4" gutterBottom>
            Home Page
          </Typography>
          <Typography variant="body1">
            Hello, World!
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default HomePage;
