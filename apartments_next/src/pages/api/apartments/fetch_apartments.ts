import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apartments = await prisma.apartment.findMany();
    res.status(200).json(apartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  } finally {
    await prisma.$disconnect();
  }
}
