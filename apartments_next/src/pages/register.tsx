// /Users/thomasbui/Desktop/apartments_next/apartments_next/src/pages/register.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Typography, Button, Box, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Layout from '@/components/Layout';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user'); // Default role is 'user'
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Email addresses do not match");
      return;
    }

    // Call your registration API
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });

    if (response.ok) {
      alert("Registration successful!");
      router.push('/login');
    } else {
      alert("Registration failed");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmEmail"
              label="Confirm Email Address"
              name="confirmEmail"
              autoComplete="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" style={{ marginTop: '1rem' }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as string)}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="realtor">Realtor</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Register
            </Button>
            <Box mt={2}>
              <Link href="/login" variant="body2">
                Already registered? Click here to go back to login page
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
