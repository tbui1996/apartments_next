import { useRouter } from 'next/router';
import { AppBar, Button, Toolbar } from '@mui/material';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/login'); // Redirect to /login page after logout
      } else {
        console.error('Failed to log out:', await response.json());
        // Handle error, show message to user, etc.
      }
    } catch (error) {
      console.error('Failed to log out:', error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Your other Navbar content */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
