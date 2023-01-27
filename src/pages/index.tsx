import Head from 'next/head';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>BikeApp</title>
			</Head>
			<main className={inter.className}>
				<div className='flex justify-center text-3xl'>BikeApp</div>
			</main>
		</>
	);
}
