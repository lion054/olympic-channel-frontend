import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import { Athlete } from '../models';
import GameRecord from './GameRecord';
import { apiEndpoint } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.secondary
  },
  logo: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  field: {
    margin: theme.spacing(1, 0)
  }
}));

const Profile: FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState<Athlete>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint(`athletes/${id}`));
        const json: Athlete = await response.json();
        setAthlete(json);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const photoUrl = useMemo(() => {
    if (athlete?.photo_id) {
      return apiEndpoint(`photos/${athlete.photo_id}`);
    }
    return '';
  }, [athlete]);

  const fullName = useMemo(() => {
    if (!!athlete?.name && !!athlete?.surname) {
      return `${athlete.name} ${athlete.surname}`;
    }
    return '';
  }, [athlete]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={() => navigate(-1)}>
            <ChevronLeft htmlColor={theme.palette.text.secondary} />
          </IconButton>
          <Typography
            variant="h6"
            align="center"
            className={classes.title}
          >{fullName} details</Typography>
          <img
            alt=""
            src="/obs_logo.png"
            className={classes.logo}
          />
        </Toolbar>
      </AppBar>
      <Box mx={2} my={2}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8} xs={12}>
            <Box display="flex" alignItems="center">
              <img
                className={classes.avatar}
                alt={fullName}
                src={photoUrl}
              />
              <Box ml={2} flex="1 0 auto">
                <Typography noWrap className={classes.field}><b>Name:</b> {fullName}</Typography>
                <Typography noWrap className={classes.field}><b>DOB:</b> {athlete?.date_of_birth}</Typography>
                <Typography noWrap className={classes.field}><b>Weight:</b> {athlete?.weight}kg</Typography>
                <Typography noWrap className={classes.field}><b>Height:</b> {athlete?.height}cm</Typography>
              </Box>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Medals</Typography>
              <ul>
                {athlete?.results?.map((result, index) => (
                  <GameRecord key={index} {...result} />
                ))}
              </ul>
            </Box>
            <Box>
              <Typography variant="h6">Bio</Typography>
              <Markdown>{athlete?.bio || ''}</Markdown>
            </Box>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
    </div>
  );
}

export default Profile;
