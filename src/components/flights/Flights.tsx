import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, AppStateType } from '../../redux/sort-reducer';
import Flight from './Flight';
import './Flights.css';
import data from '../API/flights.json';

const FlightsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const sorter = useSelector((state: AppStateType) => state.sorter);
  const sorted = useSelector((state: AppStateType) => state.sorted);

  const initialSorted = data.result.flights as Array<any>;
  const updateSorted = () => {
    let actualSorted = initialSorted;

    actualSorted = [...actualSorted].filter(function (f) {
      return f.flight.price.total.amount <= sorter.priceTo! && f.flight.price.total.amount >= sorter.priceFrom!;
    });

    if (sorter.transfer0 === true) {
      actualSorted = [...actualSorted].filter(function (f) {
        return f.flight.legs[0].segments.length === 1;
      });
    }
    if (sorter.transfer1 === true) {
      actualSorted = [...actualSorted].filter(function (f) {
        return f.flight.legs[0].segments.length === 2;
      });
    }
    if (sorter.airline0 === true) {
      actualSorted = [...actualSorted].filter(function (f) {
        return f.flight.carrier.uid === 'LO';
      });
    }
    if (sorter.airline1 === true) {
      actualSorted = [...actualSorted].filter(function (f) {
        return f.flight.carrier.uid === 'SU1';
      });
    }
    switch (sorter.sort) {
      case 'increase':
        actualSorted = [...actualSorted].sort(function (a: any, b: any) {
          return a.flight.price.total.amount - b.flight.price.total.amount;
        });
        break;
      case 'decrease':
        actualSorted = [...actualSorted].sort(function (a: any, b: any) {
          return b.flight.price.total.amount - a.flight.price.total.amount;
        });
        break;
      case 'duration':
        actualSorted = [...actualSorted].sort(function (a: any, b: any) {
          return a.flight.legs[0].duration - b.flight.legs[0].duration;
        });
        break;
      default:
    }
    dispatch(actions.setSorted(actualSorted));
  };

  useEffect(() => {
    // COMPONENT UPDATE
    updateSorted();
  }, [sorter]);

  return <Flights sorted={sorted} />;
};

const Flights: React.FC<{ sorted: Array<any> }> = (props) => {
  const [portion, setPortion] = useState(2);
  const stateArray: Array<any> = props.sorted.slice(0, portion);

  return (
    <main className='flight__container'>
      {stateArray.map((f: any) => (
        <Flight
          key={f.flightToken}
          airline1={f.flight.legs[0].segments[0].airline.caption}
          airline2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].airline.caption : 'F'}
          arrivalAirport1={f.flight.legs[0].segments[0].arrivalAirport.caption}
          arrivalAirport2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalAirport.caption : 'F'}
          arrivalAirportUid1={f.flight.legs[0].segments[0].arrivalAirport.uid}
          arrivalAirportUid2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalAirport.uid : 'F'}
          arrivalCity1={f.flight.legs[0].segments[0].arrivalCity.caption}
          arrivalCity2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalCity.caption : 'F'}
          arrivalTime1={f.flight.legs[0].segments[0].arrivalDate}
          arrivalTime2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalDate : 'F'}
          departureAirport1={f.flight.legs[0].segments[0].departureAirport.caption}
          departureAirport2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureAirport.caption : 'F'}
          departureAirportUid1={f.flight.legs[0].segments[0].departureAirport.uid}
          departureAirportUid2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureAirport.uid : 'F'}
          departureCity1={f.flight.legs[0].segments[0].departureCity.caption}
          departureCity2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureCity.caption : 'F'}
          departureTime1={f.flight.legs[0].segments[0].departureDate}
          departureTime2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureDate : 'F'}
          duration1={f.flight.legs[0].segments[0].travelDuration}
          duration2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].travelDuration : 'F'}
          price={f.flight.price.total.amount}
          transfer1={f.flight.legs[0].segments[0].stops}
          transfer2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].stops : 'F'}
        />
      ))}
      <button className='f__more' onClick={() => setPortion(portion + 2)}>
        Показать еще
      </button>
    </main>
  );
};

export default FlightsContainer;
