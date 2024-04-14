import dayjs from 'dayjs';
import { FC } from 'react';

import { fixToTwoLocalPrice } from 'utils/format-helper';
import statusEnumToReadable from 'utils/status-enum-to-readable';

import theme from './theme.module.scss';

type Data = {
  label?: string;
  value?: any;
  type?:
    | 'DATE'
    | 'DATETIME'
    | 'STRING'
    | 'CURRENCY'
    | 'IMAGE'
    | 'NUMBER'
    | 'STATUS'
    | 'FILE'
    | 'SELECT'
    | 'CUSTOM'
    | 'PRODUCTS'
    | 'LINK'
    | 'EXTERNAL_LINK'
    | 'BOOLEAN';
  helperText?: string;
  navigateTo?: string;
};

const getValue = (value: Data['value'], type: Data['type'], navigateTo?: Data['navigateTo']) => {
  if (value === undefined || value === null || value === '') return '-';

  switch (type) {
    case 'CURRENCY':
      return `₹ ${fixToTwoLocalPrice(value)}`;
    case 'DATE':
      return dayjs(value).format('DD MMMM YYYY');
    case 'DATETIME':
      return dayjs(value).format('h:mm A, DD MMMM YYYY');
    case 'FILE':
      return value ? (
        <a href={value} rel="noreferrer" target="_blank">
          Download
        </a>
      ) : (
        'Not Available'
      );
    case 'IMAGE':
      return (
        <div
          className={theme.image}
          style={{
            backgroundImage: `url("${value}")`,
          }}
        />
      );
    case 'NUMBER':
      return value;
    case 'STATUS':
      const { label, color } = statusEnumToReadable(value);
      return (
        <div className={theme.statusBadge}>
          <div className={theme.indicator} style={{ backgroundColor: color }} />
          {label}
        </div>
      );
    case 'LINK':
      return <a href={navigateTo || ''}>{value}</a>;
    case 'EXTERNAL_LINK':
      return (
        <a href={navigateTo || ''} rel="noreferrer" target="_blank">
          {value}
        </a>
      );
    case 'BOOLEAN':
      return value ? 'Yes' : 'No';
    default:
      return value;
  }
};

const DetailsPanel: FC<{ data: Data[]; title?: string }> = ({ data, title }) => {
  return (
    <div className={theme.container}>
      {title && <div className={theme.titleContainer}>{title}</div>}
      <div className={theme.content}>
        {data.map(d => (
          <div className={theme.dataContainer} key={d.label}>
            <p className={theme.label}>{d.label}</p>
            {d.helperText && <p className={theme.helperText}>{d.helperText}</p>}
            <p className={theme.value}>{getValue(d.value, d.type, d.navigateTo)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPanel;
