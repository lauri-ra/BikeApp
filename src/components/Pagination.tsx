interface PageProps {
	currentPage: number;
	pageCount: number;
	setPage: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, pageCount, setPage }: PageProps) => {
	return (
		<div className='my-2 flex flex-col items-center'>
			<span className='text-sm text-gray-700 dark:text-gray-400'>
				Page <span className='font-semibold text-gray-900 '>{currentPage} </span>
				out of <span className='font-semibold text-gray-900 '> {pageCount}</span>
			</span>
			<div className='mt-2 inline-flex'>
				<button
					onClick={() => setPage(currentPage - 1)}
					className='mr-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600'
				>
					Prev
				</button>
				<button
					onClick={() => setPage(currentPage + 1)}
					className='ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Pagination;
