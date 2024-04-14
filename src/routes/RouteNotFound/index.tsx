import { FC } from 'react';

import ErrorLayout from 'layouts/ErrorLayout';

import notFoundImage from 'media/not-found.svg';

import theme from './theme.module.scss';

const RouteNotFound: FC = () => {
  return (
    <ErrorLayout>
      <div className={theme.container}>
        <img className={theme.image} src={notFoundImage} alt="404 Route Not Found" />
        <p className={theme.title}>The page you are looking for doesn't exist</p>
        <p className={theme.description}>
          You may have mistyped the address or the page may have moved.
        </p>
      </div>
    </ErrorLayout>
  );
};
export default RouteNotFound;
