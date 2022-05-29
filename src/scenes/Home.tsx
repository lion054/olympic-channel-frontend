import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import {
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { Game } from './models';
import { apiEndpoint } from '../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.secondary
  },
  subheader: {
    backgroundColor: theme.palette.background.default
  },
  carousel: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto'
  },
  athlete: {
    width: 'unset'
  },
  name: {
    width: theme.spacing(15)
  }
}));

const Home: FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint('games?sort_by=year'));
        const json: Game[] = await response.json();
        setGames(json);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            align="center"
            className={classes.title}
          >Olympic Athletes</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={2} />
        <Grid item md={8} xs={12}>
          <List>
            {games.map(({ game_id, city, year, athletes }) => (
              <Fragment key={game_id}>
                <ListSubheader className={classes.subheader}>{city} {year}</ListSubheader>
                {!!athletes && (
                  <List className={classes.carousel}>
                    {athletes.map(({ athlete_id, name, surname, photo_id }) => (
                      <ListItem key={athlete_id} className={classes.athlete}>
                        <Card>
                          <CardActionArea onClick={() => navigate(`/profile/${athlete_id}`)}>
                            <CardMedia
                              component="img"
                              height={theme.spacing(15)}
                              image={apiEndpoint(`photos/${photo_id}`)}
                              alt={`${name} ${surname}`}
                            />
                            <CardContent>
                              <Tooltip title={`${name} ${surname}`}>
                                <Typography noWrap className={classes.name}>{name} {surname}</Typography>
                              </Tooltip>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Fragment>
            ))}
          </List>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </div>
  );
}

export default Home;
