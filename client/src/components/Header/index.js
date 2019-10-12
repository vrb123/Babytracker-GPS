import React,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';

import "./style.css";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    backgroundColor:'red',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    display: 'block',
    color:'white'
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    justifyContent: 'space-between'
  },
  brandImage: {
    height: '100px'
  },
  profileLogo: {
    color: 'white',
    width: '90px',
    height:'90px'
  },
  menuButton: {
    backgroundColor: '#386A9B',
    color: 'white',
    fontSize: '18px',
    outline: 'none',
    border: 'none'
  },
  menu: {
    display: 'flex',
    backgroundColor:'#93BC43',
    position: 'fixed',
    right: 0,
    top: '100px',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    zIndex: 3

  }
  
}));

export default function PrimarySearchAppBar() {

  const [menuVisible,toggleMenuVisible] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor:'#386A9B'}}>
        <Toolbar>
          
          <div className={classes.brand}>
            <img src={require('./logo.png')} alt='brand' className={classes.brandImage} />
          </div>
          {/* <div className={classes.grow} /> */}
          <Typography className={classes.title} variant="h4" noWrap>
            Baby GPS
          </Typography>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <button 
                className={classes.menuButton} 
                onClick={ () => toggleMenuVisible(!menuVisible)}
            > Меню
            </button>
            <Link
            to="/profile"
            onlyActiveOnIndex={false}
            >
              <div>
                <AccountCircle color='inherit' className={classes.profileLogo} />
              </div>
              
            </Link>
          </div>
        </Toolbar>
        {
          menuVisible && (
            <div className={classes.menu}>
                <Link to="/addorder" className="menu_link">Новый заказ</Link>
                <Link to="/orders" className="menu_link">Мои заказы</Link>
                <Link to="/" className="menu_link">Схема роботы</Link>
                <Link to="/orders" className="menu_link">Горячая линия</Link>
                <Link to="/orders" className="menu_link">Мои реквизиты</Link>
                <Link to="/orders" className="menu_link">Мои реквизиты</Link>
                <Link to="/orders" className="menu_link">Отчеты</Link>
                <hr color="white" style={{height:0,width:'100%',margin: 0}}/>
                <div className="brand-menu">
                  <img src={require('./logo_green.png')} alt='brand' className={classes.brandImage} />
                </div>
            </div>
          )
        }
        
      </AppBar>
    </div>
  );
}