import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Segment from './Segment';
import './Flights.css';

const Flight: React.FC<PropsType> = (props) => {
  return (
    <section className='flight'>
      <div className='f__header'>
        <div className='f__header__logo'>logo</div>
        <div className='f__header__price'>
          {props.price} {'\u20BD'}
        </div>
        <div className='f__header__notice'>Стоимость для одного взрослого пассажира</div>
      </div>
      <Segment
        aAirport={props.arrivalAirport1}
        aAirportUid={props.arrivalAirportUid1}
        aCity={props.arrivalCity1}
        airline={props.airline1}
        aTime={props.arrivalTime1}
        dAirport={props.departureAirport1}
        dAirportUid={props.departureAirportUid1}
        dCity={props.departureCity1}
        dTime={props.departureTime1}
        duration={props.duration1}
        transfer={props.transfer1}
      />
      {props.departureCity2 !== 'F' && (
        <Segment
          aAirport={props.arrivalAirport2 as string}
          aAirportUid={props.arrivalAirportUid2 as string}
          aCity={props.arrivalCity2 as string}
          airline={props.airline2 as string}
          aTime={props.arrivalTime2 as string}
          dAirport={props.departureAirport2 as string}
          dAirportUid={props.departureAirportUid2 as string}
          dCity={props.departureCity2 as string}
          dTime={props.departureTime2 as string}
          duration={props.duration2 as number}
          transfer={props.transfer2 as number}
        />
      )}
      <button className='f__submit'>ВЫБРАТЬ</button>
    </section>
  );
};

export default Flight;

type PropsType = {
  price: string;
  departureTime1: string;
  departureTime2: string;
  departureCity1: string;
  departureCity2: string;
  departureAirport1: string;
  departureAirport2: string;
  departureAirportUid1: string;
  departureAirportUid2: string;
  arrivalTime1: string;
  arrivalTime2: string;
  arrivalCity1: string;
  arrivalCity2: string;
  arrivalAirport1: string;
  arrivalAirport2: string;
  arrivalAirportUid1: string;
  arrivalAirportUid2: string;
  duration1: number;
  duration2: number;
  transfer1: number;
  transfer2: number;
  airline1: string;
  airline2: string;
};
