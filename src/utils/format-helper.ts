import dayjs from 'dayjs';

const formatLocalPrice = (num, precision = 2, locale = 'en-IN') => {
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: precision,
  });
  return formatter.format(num);
};

const getDateTime = (date, format = 'h:mm A, DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

const fixToTwoLocalPrice = num => formatLocalPrice(num);
const fixToThreeLocalPrice = num => formatLocalPrice(num, 3);

const getDate = (date, format = 'DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

const formatCurrency = (num, locale = 'en-IN') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
  });
  return formatter.format(num);
};

export { fixToTwoLocalPrice, fixToThreeLocalPrice, getDateTime, getDate, formatCurrency };
