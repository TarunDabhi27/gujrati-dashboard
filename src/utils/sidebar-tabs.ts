import deploymentIcon from 'media/icons/deployment.svg';
import homeOutline from 'media/icons/home-outline.svg';
import installationIcon from 'media/icons/installation.svg';
import repositoryIcon from 'media/icons/repository.svg';
import settingsIcon from 'media/icons/settings.svg';
import teamIcon from 'media/icons/team.svg';

const adminTabs = [
  {
    key: 'home',
    label: 'Home',
    icon: homeOutline,
    route: '/',
  },
  // {
  //   key: 'deployments',
  //   label: 'Deployments',
  //   icon: deploymentIcon,
  //   route: '/deployments',
  // },
  // {
  //   key: 'repositories',
  //   label: 'Repositories',
  //   icon: repositoryIcon,
  //   route: '/repositories',
  // },
  // {
  //   key: 'installations',
  //   label: 'Installations',
  //   icon: installationIcon,
  //   route: '/installations',
  // },
  {
    key: 'users',
    label: 'Users',
    icon: teamIcon,
    route: '/users',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: settingsIcon,
    route: '/settings',
  },
];

const getSidebarTabs = () => {
  return adminTabs;
};

export default getSidebarTabs;
