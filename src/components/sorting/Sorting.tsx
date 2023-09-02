import React, { useEffect, useState } from 'react';
import './Sorting.css';
import { Formik, Form, Field } from 'formik';
import { actions, AppStateType, SorterType } from '../../redux/sort-reducer';
import { useDispatch, useSelector } from 'react-redux';

export const Sorting = () => {
  const dispatch = useDispatch();
  const setSorter = (LocalSorter: SorterType) => {
    dispatch(actions.setSorter(LocalSorter));
  };
  const handleSubmit = (e: any) => {
    getSorterFromForm(e.target.name, e.target.value);
  };
  const sorter = useSelector((state: AppStateType) => state.sorter);
  const sorted = useSelector((state: AppStateType) => state.sorted); // to get less airline price

  const [lessAirlinePrice0, setLAP0] = useState(0);
  const [lessAirlinePrice1, setLAP1] = useState(0);

  const getSorterFromForm = (name: string, values: any) => {
    if (values === 'true') {
      values = false;
    } else if (values === 'false') {
      values = true;
    }
    let actualSorter = sorter;
    switch (name) {
      case 'sort':
        actualSorter = { ...actualSorter, sort: values };
        break;
      case 'transfer0':
        actualSorter = { ...actualSorter, transfer0: values };
        break;
      case 'transfer1':
        actualSorter = { ...actualSorter, transfer1: values };
        break;
      case 'price_from':
        // eslint-disable-next-line camelcase
        actualSorter = { ...actualSorter, priceFrom: Number(values) };
        break;
      case 'price_to':
        // eslint-disable-next-line camelcase
        actualSorter = { ...actualSorter, priceTo: Number(values) };
        break;
      case 'airline0':
        actualSorter = { ...actualSorter, airline0: values };
        break;
      case 'airline1':
        actualSorter = { ...actualSorter, airline1: values };
        break;
      default:
    }
    // eslint-disable-next-line no-constant-condition,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-constant-condition
    if ({ ...actualSorter } !== { ...sorter }) {
      setSorter(actualSorter);
    }
  };

  useEffect(() => {
    // less airline price
    let actualSorted0 = [...sorted].filter(function (f) {
      return f.flight.carrier.uid === 'LO';
    });
    let actualSorted1 = [...sorted].filter(function (f) {
      return f.flight.carrier.uid === 'SU1';
    });
    actualSorted0 = [...actualSorted0].sort(function (a: any, b: any) {
      return a.flight.price.total.amount - b.flight.price.total.amount;
    });
    actualSorted1 = [...actualSorted1].sort(function (a: any, b: any) {
      return a.flight.price.total.amount - b.flight.price.total.amount;
    });
    setLAP0(actualSorted0[0].flight.price.total.amount);
    setLAP1(actualSorted1[0].flight.price.total.amount);
  }, []);

  return (
    <aside>
      <Formik initialValues={sorter} onSubmit={handleSubmit}>
        {() => (
          <Form className='sorting__container'>
            <div className='s__items'>
              <h4>Сортировать</h4>
              <label>
                <Field name='sort' onClick={handleSubmit} type='radio' value='increase' />- по возрастанию цены
              </label>
              <label>
                <Field name='sort' onClick={handleSubmit} type='radio' value='decrease' />- по убыванию цены
              </label>
              <label>
                <Field name='sort' onClick={handleSubmit} type='radio' value='duration' />- во времени в пути
              </label>
            </div>
            <div className='s__items'>
              <h4>Фильтровать</h4>
              <label>
                <Field name='transfer0' onClick={handleSubmit} type='checkbox' />- без пересадок
              </label>
              <label>
                <Field name='transfer1' onClick={handleSubmit} type='checkbox' />- 1 пересадка
              </label>
            </div>
            <div className='s__items'>
              <h4>Цена</h4>
              <label>
                От <Field className='s__price' min={0} name='price_from' onBlur={handleSubmit} type='number' />
              </label>
              <label>
                До <Field className='s__price' min={0} name='price_to' onBlur={handleSubmit} type='number' />
              </label>
            </div>
            <div className='s__items'>
              <h4>Авиакомпании</h4>
              <div className='row'>
                <label className='s__airline__label'>
                  <Field name='airline0' onClick={handleSubmit} type='checkbox' />- LOT Polish Airlines{' '}
                </label>
                <div className='s__airline__price'> от {lessAirlinePrice0} р.</div>
              </div>
              <div className='row'>
                <label className='s__airline__label'>
                  <Field name='airline1' onClick={handleSubmit} type='checkbox' />- Аэрофлот - российские авиалинии{' '}
                </label>
                <div className='s__airline__price'> от {lessAirlinePrice1} р.</div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </aside>
  );
};
