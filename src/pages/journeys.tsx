import { InferGetStaticPropsType } from 'next';
import { prisma } from 'prisma/connectPrisma';
import { useState } from 'react';
import { Journey } from 'types';
import Pagination from '@/components/Pagination';
import JourneyList from '@/components/JourneyList';

export default function Journeys({ journeyList }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [filter, setFilter] = useState('');
	const [filteredJourneys, setFilteredJourneys] = useState(journeyList);
	const [currentPage, setCurrentPage] = useState(1);

	const pageCount = Math.ceil(journeyList.length / 10);
	const itemsPerPage = 10;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const journeysToDisplay = filteredJourneys.slice(startIndex, startIndex + itemsPerPage);

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

	const handlePageClick = (pageNumber: number) => {
		if (pageNumber > pageCount || pageNumber < 1) {
			return;
		} else setCurrentPage(pageNumber);
	};

	return (
		<div className='h-screen bg-neutral-100'>
			<div className='flex justify-center pt-5 text-4xl'>Journey List</div>

			<div className='my-8 flex justify-center'>
				<form>
					<input
						placeholder='Search by station'
						value={filter}
						onChange={handleSearch}
						className='block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
					></input>
				</form>
			</div>

			<JourneyList journeys={journeysToDisplay} />
			<Pagination currentPage={currentPage} setPage={handlePageClick} pageCount={pageCount} />
		</div>
	);
}

export async function getStaticProps() {
	const res: Journey[] = await prisma.journeys.findMany({});

	// Stringify the response, since getStaticProps doesnt allow passing objects like Date
	const journeyList: Journey[] = JSON.parse(JSON.stringify(res));

	return {
		props: { journeyList },
	};
}
