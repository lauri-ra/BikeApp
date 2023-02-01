import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Head>
				<title>BikeApp</title>
			</Head>
			<main className='h-screen bg-slate-900 text-white'>
				<div className='flex justify-center text-3xl'>BikeApp</div>
				<div className='flex justify-center pt-10'>
					<Link href='/journeys'>
						<button className='mr-3 rounded-md bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-400'>
							Journeys
						</button>
					</Link>
					<Link href='#'>
						<button className='mr-3 rounded-md bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-400'>
							Stations
						</button>
					</Link>
				</div>
			</main>
		</>
	);
}
