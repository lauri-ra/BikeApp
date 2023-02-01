import { InferGetStaticPropsType } from 'next';
import { prisma } from 'prisma/connectPrisma';
import { Journey } from 'types';

export default function Journeys({ journeyList }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className='h-screen bg-slate-900 text-white'>
			<div className='flex justify-center pt-5 text-3xl'>Journeys</div>

			<div className='flex justify-center py-12'>
				<form>
					<input
						placeholder='Search...'
						className='block w-60 rounded-lg border border-gray-600 bg-gray-700 p-2 text-center text-sm text-gray-900 hover:bg-gray-600'
					></input>
				</form>
			</div>

			<div className='relative mx-8 overflow-x-auto rounded-lg ring-1 ring-slate-600'>
				<table className='w-full table-auto content-center text-left'>
					<thead className='bg-slate-600 text-xs font-thin uppercase'>
						<tr>
							<th className='px-6 py-3'>Departure station</th>
							<th className='px-6 py-3'>Return station</th>
							<th className='px-6 py-3'>Covered distance (km)</th>
							<th className='px-6 py-3'>Duration (min)</th>
						</tr>
					</thead>
					<tbody>
						{journeyList.map((journey) => (
							<tr key={journey.id} className='hover:bg-slate-800'>
								<td className='px-6 py-2'>{journey.departure_station_name}</td>
								<td className='px-6 py-2'>{journey.return_station_name}</td>
								<td className='px-6 py-2'>{(journey.covered_distance_m / 1000).toFixed(2)}</td>
								<td className='px-6 py-2'>{(journey.duration_s / 60).toFixed(0)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const res: Journey[] = await prisma.journeys.findMany();

	// Stringify the response, since getStaticProps doesnt allow passing objects like Date
	const journeyList: Journey[] = JSON.parse(JSON.stringify(res));

	return {
		props: { journeyList },
	};
}
