import React, { useState } from "react";
import { Chip, Grid } from "@material-ui/core";
import CommentFeed from "../../Feed/CommentFeed/CommentFeed";
import BetDescription from "../../Form/Description/BetDescription";
import UserHeader from "../../Feed/Header/UserHeader";
import useStyles from "../ModalBase.style";
import AcceptBetButton from "../../Form/Buttons/AcceptBetButton";

const MainBet = ({ betInfo }) => {
  const classes = useStyles();
  const [selectedChip, setSelectedChip] = useState("comments");
  const bodies = {
    comments: <CommentFeed betInfo={betInfo} />,
    accept: (
      <AcceptBetButton
        betInfo={betInfo}
        variant="contained"
        color="primary"
        padding={20}
      />
    ),
  };

  const handleChipClick = (event) => {
    const { value } = event.currentTarget.attributes.name;
    setSelectedChip(value);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid
        item
        container
        spacing={4}
        xs={11}
        sm={4}
        className={classes.container}
      >
        <Grid item xs={12}>
          <UserHeader
            userInfo={betInfo.main_user}
            timestamp={betInfo.createdAt}
          />
        </Grid>
        <Grid item xs={12}>
          <BetDescription betInfo={betInfo} />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            style={{ textAlign: "center", marginBottom: 15 }}
          >
            <Grid item xs={4} md={3}>
              <Chip
                label="Comments"
                name="comments"
                clickable
                color={selectedChip === "comments" ? "primary" : "secondary"}
                onClick={handleChipClick}
              />
            </Grid>
            <Grid item xs={4} md={3}>
              <Chip
                label="Accept"
                name="accept"
                clickable
                color={selectedChip === "accept" ? "primary" : "secondary"}
                onClick={handleChipClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {bodies[selectedChip]}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainBet;
