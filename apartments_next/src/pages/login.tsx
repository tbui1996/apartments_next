import { signIn } from 'next-auth/react';
import Layout from '@/components/Layout';

export default function LoginPage() {
    return (
      <Layout>
        <h1>Login Page</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          signIn('credentials', { callbackUrl: '/' });
        }}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
      </Layout>
    );
  }