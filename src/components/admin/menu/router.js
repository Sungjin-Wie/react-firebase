import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Link,
  ListItem,
  Collapse,
  ListItemText,
  Typography,
  Breadcrumbs
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Route, MemoryRouter } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const breadcrumbNameMap = {
  "/inbox": "Inbox",
  "/inbox/important": "Important",
  "/trash": "Trash",
  "/spam": "Spam",
  "/drafts": "Drafts"
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const LinkRouter = props => <Link {...props} component={RouterLink} />;

const AdminRouter = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split("/").filter(x => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
        <nav className={classes.lists} aria-label="mailbox folders">
          <List>
            <ListItemLink to="/inbox" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink
                  to="/inbox/important"
                  className={classes.nested}
                />
              </List>
            </Collapse>
            <ListItemLink to="/trash" />
            <ListItemLink to="/spam" />
          </List>
        </nav>
      </div>
    </MemoryRouter>
  );
};

export default AdminRouter;
