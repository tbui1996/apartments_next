// pages/home.tsx
import { signOut, useSession } from 'next-auth/react';
import { Button, Container, Typography, Box } from '@mui/material';
import Layout from '@/components/Layout'; // Replace with your Layout component
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  
  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    router.push('/login')
  };

  if (!session) {
    return null; // Redirect or handle case where user is not logged in
  }
  console.log('what is session here: ', session.user?.id)

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1">
          {session.user?.email}
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
  );
};

export default HomePage;
