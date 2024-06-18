// src/pages/api/auth/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, signOut } from 'next-auth/react';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    await signOut({ callbackUrl: '/login' }); // Redirect to the home page after logout
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(401).json({ message: 'No active session found' });
  }
}
