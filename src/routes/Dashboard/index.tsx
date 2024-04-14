import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';

import SidebarLayout from 'layouts/SidebarLayout';

import Banner from 'components/Banner';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type DashboardQueryResponse = {
  me: {
    userName: string;
  };
};

const DASHBOARD_QUERY = gql`
  query Me {
    me {
      userName
    }
  }
`;

const Home: FC = () => {
  const { loading, error, data, refetch } = useQuery<DashboardQueryResponse>(DASHBOARD_QUERY);

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    return (
      <Banner
        title={`Welcome back, ${data.me.userName}!`}
        description="This page will be a place for you to quickly see the high priority items that need your attention."
        listItems={['View installations', 'View users', 'View repositories and deployments']}
      />
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Dashboard" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Home;
