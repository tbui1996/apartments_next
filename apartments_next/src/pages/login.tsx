// pages/login.tsx
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, TextField, Typography, Box, Link } from '@mui/material';
import Layout from '@/components/Layout';
import { getServerSession } from 'next-auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const {data: session, status} = useSession()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

     // Attempt to sign in with credentials
     const result = await signIn('credentials', { 
      redirect: false,
      email,
      password,
      callbackUrl: '/' 
    });

    if (result?.error) {
      alert('Login Failed. Please enter correct email and/or password')
    } else {
      if (status === "authenticated"){
        if (session){
          if (session.user?.id?.toLowerCase() == "user"){
            router.push('/home')
          }else {
            router.push('/realtorhome')
          }
        }
      }
      // if(session?.user?.id === 'user')
      // {
      //   router.push('/home')
      // }else {
      //   router.push('/realtorhome')
      // }
    }
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h4" gutterBottom>
            Login Page
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Sign In
            </Button>
          </form>
          <Box mt={2}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
