import React, { Fragment, FunctionComponent } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

import { AthleteResult } from '../models';

const useStyles = makeStyles((theme) => ({
  root: {},
  medal: {
    display: 'flex',
    width: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(6)
    }
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  }
}));

const GameRecord: FunctionComponent<AthleteResult> = (props: AthleteResult) => {
  const classes = useStyles();

  const { city, gold, silver, bronze } = props;

  return (
    <li>
      <Box display="flex">
        <Box flex={1}>
          <Typography component="span">{city}</Typography>
        </Box>
        <Box className={classes.medal}>
          {!!gold && (
            <Fragment>
              <Typography>{gold}</Typography>
              <img alt="Gold" src="/medal_gold.png" className={classes.icon} />
            </Fragment>
          )}
        </Box>
        <Box className={classes.medal}>
          {!!silver && (
            <Fragment>
              <Typography>{silver}</Typography>
              <img alt="Silver" src="/medal_silver.png" className={classes.icon} />
            </Fragment>
          )}
        </Box>
        <Box className={classes.medal}>
          {!!bronze && (
            <Fragment>
              <Typography>{bronze}</Typography>
              <img alt="Bronze" src="/medal_bronze.png" className={classes.icon} />
            </Fragment>
          )}
        </Box>
      </Box>
    </li>
  );
}

export default GameRecord;
