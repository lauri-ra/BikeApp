import { Journey } from 'types';

interface JourneyProps {
	journey: Journey;
}

const JourneyView = (props: JourneyProps) => {
	return (
		<div>
			<div>{props.journey.id}</div>
			<div>{props.journey.return.toString()}</div>
			<div>{props.journey.departure.toString()}</div>
			<br></br>
		</div>
	);
};

export default JourneyView;
