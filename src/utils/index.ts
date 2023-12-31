const transformMonth = {
  0: 'янв.',
  1: 'фев.',
  2: 'март',
  3: 'апр.',
  4: 'май',
  5: 'июн.',
  6: 'июл.',
  7: 'авг.',
  8: 'сент.',
  9: 'отк.',
  10: 'нояб.',
  11: 'дек.',
};

const transformDayOfWeek = {
  0: 'вс',
  1: 'пн',
  2: 'вт',
  3: 'ср',
  4: 'чт',
  5: 'пт',
  6: 'сб',
};

export const tranformDuration = (duration: number) => {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;

  return `${hours}\u00A0ч ${minutes >= 10 ? minutes : '0' + minutes}\u00A0мин`;
};

export const transformTime = (date: string | string[]) => {
  const index = date.indexOf('T');
  const time = date.slice(index + 1, date.length - 3);

  return time;
};

export const transformDate = (str: string | string[]) => {
  const index = str.indexOf('T');
  const date = str.slice(0, index);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newDate = new Date(date);

  const day = newDate.getDate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const month = transformMonth[newDate.getMonth()];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dayOfWeek = transformDayOfWeek[newDate.getDay()];

  return `${day} ${month} ${dayOfWeek}`;
};
