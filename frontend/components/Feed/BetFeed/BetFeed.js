import React from "react";
import { List, makeStyles } from "@material-ui/core";
import BetFeedItem from "../FeedItems/BetFeedItem";
import useSelectedBet from "../../../hooks/useSelectedBet";
import EmptyBetFeed from "../../Common/EmptyState/EmptyBetFeed";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowY: "auto",
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    display: "flex",
    justifyContent: "center",
  },
}));

const BetFeed = ({ betInfo }) => {
  const classes = useStyles();
  const { selectedBet } = useSelectedBet();
  return (
    <>
      {betInfo?.length > 0 ? (
        <List className={classes.root}>
          <>
            {betInfo.map((bet) => (
              <BetFeedItem betInfo={bet} key={bet.id} />
            ))}
          </>
        </List>
      ) : (
        <div className={classes.inline}>
          <EmptyBetFeed />
        </div>
      )}
    </>
  );
};

export default BetFeed;
