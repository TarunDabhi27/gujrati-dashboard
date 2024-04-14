import arrowBackIcon from 'media/icons/arrow-back-outline.svg';

import theme from './theme.module.scss';

export default function Navbar({
  title,
  subTitle,
  onBackButtonClick,
}: {
  title: string;
  subTitle?: string;
  onBackButtonClick?: () => void;
}) {
  return (
    <div className={theme.container}>
      {onBackButtonClick && (
        <div className={theme.backButton} onClick={onBackButtonClick}>
          <img src={arrowBackIcon} alt="Back" height={24} />
        </div>
      )}
      <div>
        <p className={theme.title}>{title}</p>
        <p className={theme.subTitle}>{subTitle}</p>
      </div>
    </div>
  );
}
