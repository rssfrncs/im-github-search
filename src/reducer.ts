import { produce } from "immer";
import { Action } from "./actions";

export type Prediction = { id: string; login: string };
export type User = any;
export const notificationType = ["error", "success"] as const;
export type NotificationType = typeof notificationType[number];

export type State = {
  search: string;
  prediction: Prediction[];
  users: User[];
  active: string | null;
  notification: {
    message: string;
    type: NotificationType;
  } | null;
};

const iniitalState = (): State => ({
  search: "",
  prediction: [],
  users: [],
  active: null,
  notification: null
});

export const reducer = (state: State = iniitalState(), action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "user loaded": {
        draft.users.push(action.payload);
        break;
      }
      case "prediction loaded": {
        draft.prediction = action.payload;
        break;
      }
      case "active user changed": {
        draft.active = action.payload;
        draft.search = "";
        draft.prediction = [];
        break;
      }
      case "search updated": {
        draft.search = action.payload;
        break;
      }
      case "notification updated": {
        draft.notification = action.payload;
        break;
      }
      case "notification clicked": {
        draft.notification = null;
        break;
      }
    }
  });
};
