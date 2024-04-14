import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import theme from './theme.module.scss';

export interface TabItem {
  key: string;
  label: string;
  route: string;
  icon?: string;
  exact?: boolean;
}

export default function HorizontalTabs({ tabs }: { tabs: TabItem[] }) {
  const location = useLocation();

  return (
    <div className={theme.container}>
      {tabs.map(tab => (
        <NavLink
          key={tab.key}
          to={tab.route}
          className={classNames(
            theme.tab,
            tab.exact
              ? location.pathname === tab.route
                ? theme.active
                : null
              : location.pathname === tab.route ||
                (location.pathname.includes(tab.route) && tab.route !== '/')
              ? theme.active
              : null
          )}
        >
          {tab.icon && <img src={tab.icon} alt={tab.label} width={20} height={20} />}
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
