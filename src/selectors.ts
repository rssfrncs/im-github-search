import { State } from "./reducer";
import { createSelector } from "reselect";

export const selectUser = createSelector(
  (state: State) => state.users,
  (state: State) => state.active,
  (users, login) => users.find(user => user.login === login)
);

export const selectSearch = createSelector(
  (state: State) => state.search,
  search => search
);

export const selectNotification = createSelector(
  (state: State) => state.notification,
  notification => notification
);
