import React from 'react';

import './Flights.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Airline, Day, Destination, DestinationProps, Duration, Time, Transfer } from './SegmentMicroComponents';

const Segment: React.FC<SegmentPropsType> = (props) => {
  return (
    <div className='f__segment'>
      <Destination
        aAirport={props.aAirport}
        aAirportUid={props.aAirportUid}
        aCity={props.aCity}
        dAirport={props.dAirport}
        dAirportUid={props.dAirportUid}
        dCity={props.dCity}
      />
      <div className='f__segment__departure'>
        <div>
          <Time time={props.dTime} /> <Day time={props.dTime} />
        </div>
        <Duration duration={props.duration} />
        <div>
          <Day time={props.aTime} /> <Time time={props.aTime} />
        </div>
      </div>
      <Transfer transfer={props.transfer} />
      <Airline airline={props.airline} />
    </div>
  );
};

export default Segment;

type SegmentPropsType = DestinationProps & {
  aTime: string;
  dTime: string;
  duration: number;
  transfer: number;
  airline: string;
};
