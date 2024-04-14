import BackupIcon from '@mui/icons-material/Backup';
import classNames from 'classnames';
import { FC, useRef } from 'react';

import theme from './theme.module.scss';

const UploadInput: FC<{
  value: any;
  onChange;
  helperText?: string;
  accept?: string;
}> = ({ value, onChange, helperText, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={theme.uploadContainer}
        onClick={() => (inputRef && inputRef.current ? inputRef.current.click() : {})}
      >
        <div className={theme.content}>
          <BackupIcon className={theme.uploadIcon} />
          <span className={classNames(theme.fileLabel, value ? theme.fileAdded : null)}>
            {value ? value.name : 'Click here to upload a file'}
          </span>
          <input
            className={theme.uploadButton}
            type="file"
            key="input-file"
            id="imageFile"
            multiple={true}
            accept={accept ? accept : 'image/*, .pdf'}
            ref={inputRef}
            onChange={e => onChange(e.target.files)}
          />
        </div>
      </div>
      <p className={theme.helperText}>{helperText}</p>
    </>
  );
};

export default UploadInput;
