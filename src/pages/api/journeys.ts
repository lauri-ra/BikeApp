import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/connectPrisma';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	const journeys = await prisma.journeys.findMany();

	res.status(200).json(journeys);
}
