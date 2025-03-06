import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchCalls } from "../../redux/callsSlice";
import CallItem from "../CallItem/CallItem";
import styles from "./CallList.module.scss";

const CallList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { calls, status } = useSelector((state: RootState) => state.calls);

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  return (
    <div className={styles.callList}>
      {status === "loading" ? (
        <p>Загрузка...</p>
      ) : (
        calls.results.map((call) => <CallItem key={Math.random()} call={call} />)
      )}
    </div>
  );
};

export default CallList;