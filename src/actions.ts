import { User, NotificationType, Prediction } from "./reducer";

export type Action =
  | {
      type: "search updated";
      payload: string;
    }
  | {
      type: "prediction loaded";
      payload: Prediction[];
    }
  | {
      type: "user loaded";
      payload: User;
    }
  | {
      type: "notification updated";
      payload: { message: string; type: NotificationType } | null;
    }
  | {
      type: "notification clicked";
    }
  | {
      type: "active user changed";
      payload: string;
    };
