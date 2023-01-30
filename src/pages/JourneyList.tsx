import { InferGetStaticPropsType } from 'next';
import { prisma } from 'prisma/connectPrisma';
import { Journey } from 'types';
import JourneyView from 'components/JourneyView';

export default function Journeys({ journeyList }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<ul>
				{journeyList.map((journey) => (
					<JourneyView key={journey.id} journey={journey} />
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const res: Journey[] = await prisma.journeys.findMany();
	const journeyList: Journey[] = JSON.parse(JSON.stringify(res));

	return {
		props: { journeyList },
	};
}
