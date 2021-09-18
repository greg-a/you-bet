import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { formatDate } from '../../../utils/formatters';
import SearchResultsFeed from '../../Feed/SearchResults/SearchResults';

const BetDescription = ({ betInfo }) => {
  return (
    <List style={{ overflowWrap: 'break-word' }}>
      <ListItem>
        <ListItemText primary="Description" secondary={betInfo.description} secondaryTypographyProps={{ color: "secondary" }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Amount" secondary={`$${betInfo.bet_amount}`} secondaryTypographyProps={{ color: "secondary" }} />
      </ListItem>
      <ListItem>
        <ListItemText primary="End Date" secondary={formatDate(betInfo.end_date, 'date')} secondaryTypographyProps={{ color: "secondary" }} />
      </ListItem>
      {betInfo?.accepted_user && (
        <ListItem style={{ borderStyle: 'solid', borderColor: 'white', borderWidth: 0.5, borderRadius: 5 }}>
          <ListItemText
            primary="Accepted by"
            secondary={<SearchResultsFeed userList={[betInfo.accepted_user]} />}
          />
        </ListItem>
      )}
    </List>
  );
};

export default BetDescription;
