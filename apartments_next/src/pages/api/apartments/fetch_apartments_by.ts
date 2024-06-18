import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { minArea, maxArea, minPrice, maxPrice } = req.query;

  try {
    const apartments = await prisma.apartment.findMany({
      where: {
        ...(minArea && { area: { gte: Number(minArea) } }),
        ...(maxArea && { area: { lte: Number(maxArea) } }),
        ...(minPrice && { monthlyPrice: { gte: Number(minPrice) } }),
        ...(maxPrice && { monthlyPrice: { lte: Number(maxPrice) } }),
      },
    });
    res.status(200).json(apartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  } finally {
    await prisma.$disconnect();
  }
}
