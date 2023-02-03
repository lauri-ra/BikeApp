import { Journey } from 'types';

interface ListProps {
	journeys: Journey[];
}

const JourneyList = (props: ListProps) => {
	return (
		<div className='relative mx-8 overflow-x-auto rounded-lg ring-1 ring-neutral-300'>
			<table className='w-full table-auto content-center text-left'>
				<thead className='bg-neutral-300 text-xs font-thin uppercase text-gray-700 drop-shadow'>
					<tr>
						<th className='px-6 py-3'>Departure station</th>
						<th className='px-6 py-3'>Return station</th>
						<th className='px-6 py-3'>Covered distance (km)</th>
						<th className='px-6 py-3'>Duration (min)</th>
					</tr>
				</thead>
				<tbody>
					{props.journeys.map((journey) => (
						<tr key={journey.id} className='hover:bg-neutral-300'>
							<td className='px-6 py-2.5'>{journey.departure_station_name}</td>
							<td className='px-6 py-2.5'>{journey.return_station_name}</td>
							<td className='px-6 py-2.5'>{(journey.covered_distance_m / 1000).toFixed(2)}</td>
							<td className='px-6 py-2.5'>{(journey.duration_s / 60).toFixed(0)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default JourneyList;
