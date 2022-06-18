import React from "react";
import { Grid } from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";
import BasicFeedItem from "./BasicFeedItem";
import CommentButton from "../../Form/Buttons/CommentButton";
import AcceptBetButton from "../../Form/Buttons/AcceptBetButton";
import BetDetailsButton from "../../Form/Buttons/BetDetailsButton";
import CancelBetButton from "../../Form/Buttons/CancelBetButton";

const BetFeedItem = ({ betInfo }) => {
  const { userInfo } = useAuth();
  return (
    <BasicFeedItem
      user={betInfo.main_user}
      modalData={betInfo}
      body={betInfo.description}
      timestamp={betInfo.createdAt}
    >
      <Grid container justifyContent="space-around">
        <Grid item md={3}>
          <BetDetailsButton betInfo={betInfo} />
        </Grid>
        <Grid item md={3}>
          <CommentButton betInfo={betInfo} />
        </Grid>
        <Grid item md={3}>
          {userInfo?.id === betInfo.main_user.id ? (
            <CancelBetButton betInfo={betInfo} />
          ) : (
            <AcceptBetButton betInfo={betInfo} />
          )}
        </Grid>
      </Grid>
    </BasicFeedItem>
  );
};

export default BetFeedItem;
