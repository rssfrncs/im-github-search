import React from "react";
import { Provider } from "react-redux";
import { store, useTypedSelector, useTypedDispatch, persistor } from "./store";
import { selectUser, selectSearch, selectNotification } from "./selectors";
import { User } from "./reducer";
import { PersistGate } from "redux-persist/integration/react";
import {
  Prediction,
  Input,
  Space,
  Row,
  Column,
  UserWrapper,
  Avatar
} from "./style";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Notification />
        <div className="App">
          <Search>
            <Predictions />
          </Search>
          <Space />
          <ActiveUser />
          <History />
        </div>
      </PersistGate>
    </Provider>
  );
};

const Search: React.FC = ({ children }) => {
  const dispatch = useTypedDispatch();
  const search = useTypedSelector(selectSearch);
  return (
    <Column>
      <Input
        type="text"
        value={search}
        placeholder="Start typing a user login"
        onChange={e =>
          void dispatch({ type: "search updated", payload: e.target.value })
        }
      />
      {children}
    </Column>
  );
};

const ActiveUser = () => {
  const activeUser = useTypedSelector(selectUser);
  return activeUser ? <UserCard user={activeUser} /> : null;
};

const UserCard: React.FC<{ user: User; onClick?: () => void }> = ({
  user,
  onClick
}) => {
  return user ? (
    <UserWrapper
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <Avatar
        height={50}
        width={50}
        style={{
          transform: "translateY(-50%)"
        }}
        src={user.avatar_url}
        alt="user"
      />
      <h2> {user.login}</h2>
    </UserWrapper>
  ) : null;
};

const Predictions: React.FC = () => {
  const dispatch = useTypedDispatch();
  const predictions = useTypedSelector(state => state.prediction);
  return predictions.length ? (
    <div
      style={{
        height: 200,
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {predictions.map(prediction => (
        <Prediction
          key={prediction.id}
          onClick={() =>
            void dispatch({
              type: "active user changed",
              payload: prediction.login
            })
          }
        >
          {prediction.login}
        </Prediction>
      ))}
    </div>
  ) : null;
};

const History: React.FC = () => {
  const dispatch = useTypedDispatch();
  const history = useTypedSelector(state =>
    state.users.filter(user => user.login !== state.active)
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <h2>History</h2>
      <Row>
        {history.map(user => (
          <>
            <UserCard
              user={user}
              onClick={() =>
                void dispatch({
                  type: "active user changed",
                  payload: user.login
                })
              }
            />
            <Space />
          </>
        ))}
      </Row>
    </div>
  );
};

const Notification: React.FC = () => {
  const dispatch = useTypedDispatch();
  const notification = useTypedSelector(selectNotification);
  return notification ? (
    <div
      onClick={() => void dispatch({ type: "notification clicked" })}
      style={{
        position: "fixed",
        top: 5,
        right: 5,
        background: notification.type === "error" ? "red" : "green",
        padding: 20
      }}
    >
      {notification.message}
    </div>
  ) : null;
};
export default App;
