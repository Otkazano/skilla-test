import React from "react";
import styles from "./CallItem.module.scss";

interface CallItemProps {
  call: {
    id: number;
    date: string;
    duration: string;
    in_out: number;
    contact: string;
  };
}

const CallItem: React.FC<CallItemProps> = ({ call }) => {
  return (
    <div className={styles.callItem}>
      <span>{call.in_out === 1 ? "📞 Входящий" : "📤 Исходящий"}</span>
      <span>{call.contact}</span>
      <span>{call.date}</span>
      <span>{call.duration}</span>
    </div>
  );
};

export default CallItem;