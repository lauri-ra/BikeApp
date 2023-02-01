import { InferGetStaticPropsType } from 'next';
import { prisma } from 'prisma/connectPrisma';
import { useState } from 'react';
import { Journey } from 'types';

export default function Journeys({ journeyList }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [filter, setFilter] = useState('');
	const [filteredJourneys, setFilteredJourneys] = useState(journeyList);

	const handleSearch = (event: any) => {
		setFilter(event.target.value);

		setFilteredJourneys(
			journeyList.filter((journey) => {
				return (
					journey.departure_station_name.toLowerCase().includes(filter.toLowerCase()) ||
					journey.return_station_name.toLowerCase().includes(filter.toLowerCase())
				);
			})
		);
	};

	return (
		<div className='h-screen bg-slate-900 text-white'>
			<div className='flex justify-center pt-5 text-3xl'>Journeys</div>

			<div className='flex justify-center py-12'>
				<form>
					<input
						placeholder='Search...'
						value={filter}
						onChange={handleSearch}
						className='block w-60 rounded-lg border border-gray-600 bg-gray-700 p-2 text-center text-white outline-none hover:bg-gray-600 focus:border-sky-400 focus:drop-shadow-md'
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
						{filteredJourneys.map((journey) => (
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
