import { Search as SearchIcon } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton, List, ListItem, Paper, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';

import theme from './theme.module.scss';

type Log = {
  message: string;
  createdAt: string;
};

const LogViewer: FC<{
  logs: Log[];
  enableSearch?: boolean;
}> = ({ logs, enableSearch = true }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Log[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);

  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current && !isManuallyScrolling) {
      // @ts-ignore
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isManuallyScrolling]);

  const handleScroll = () => {
    const container = logContainerRef.current;
    setIsManuallyScrolling(
      // @ts-ignore
      container.scrollTop + container.clientHeight < container.scrollHeight
    );
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      setActiveResultIndex(-1);
      return;
    }

    const matchingLogs = logs.filter(log =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(matchingLogs);
    setActiveResultIndex(matchingLogs.length > 0 ? matchingLogs.length - 1 : -1);

    if (matchingLogs.length > 0) {
      const lastMatchingLog = matchingLogs[matchingLogs.length - 1];
      const resultElement = document.getElementById(`result-${lastMatchingLog.createdAt}`);
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    setIsManuallyScrolling(false);
  };

  const handleNavigateResults = (direction: number) => {
    if (searchResults.length === 0) {
      return;
    }

    let newIndex = activeResultIndex + direction;
    if (newIndex < 0) {
      newIndex = searchResults.length - 1;
    } else if (newIndex >= searchResults.length) {
      newIndex = 0;
    }

    setActiveResultIndex(newIndex);

    const resultElement = document.getElementById(`result-${searchResults[newIndex].createdAt}`);
    if (resultElement) {
      resultElement.scrollIntoView({
        block: 'center',
        inline: 'nearest',
      });
    }
  };

  const getighlightedLogMessage = (logMessage: string) => {
    if (!searchTerm) {
      return <>{logMessage}</>;
    }
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(escapedSearchTerm, 'gi');
    const parts = logMessage.split(searchRegex);

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className={theme.highlight}>{logMessage.match(searchRegex)?.[index - 1]}</span>
            )}
            {part}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className={theme.logContainer}>
      {enableSearch && (
        <div className={theme.searchBar}>
          <TextField
            className={theme.input}
            variant="outlined"
            placeholder="Search logs..."
            fullWidth
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {searchResults.length > 0 && (
            <div className={theme.searchResult}>
              <span className={theme.resultCount}>{`${activeResultIndex + 1} of ${
                searchResults.length
              } results`}</span>
              <IconButton
                aria-label="delete"
                size="small"
                disabled={activeResultIndex === 0}
                onClick={() => handleNavigateResults(-1)}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                disabled={activeResultIndex === searchResults.length - 1}
                onClick={() => handleNavigateResults(1)}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
      )}

      <Paper className={theme.logViewer} ref={logContainerRef} onScroll={handleScroll}>
        <div className={theme.logList}>
          <List>
            {logs.map(log => (
              <ListItem
                key={log.createdAt}
                id={`result-${log.createdAt}`}
                className={`${theme.listItem} ${
                  activeResultIndex >= 0 &&
                  searchResults[activeResultIndex].createdAt === log.createdAt
                    ? theme.activeResult
                    : ''
                }`}
              >
                <div className={theme.logContent}>
                  <div className={theme.timestamp}>
                    ▸{dayjs(parseInt(log.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <p className={theme.message}>{getighlightedLogMessage(log.message)}</p>
                </div>
              </ListItem>
            ))}
            <ListItem className={theme.listItem}>
              <div className={theme.logContent}>
                <div className={theme.timestamp}>▸---------- -------- </div>
              </div>
            </ListItem>
          </List>
        </div>
      </Paper>
    </div>
  );
};

export default LogViewer;
