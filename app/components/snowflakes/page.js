"use client";

import styles from "./snowflakes.module.css";

export default function Snowflakes() {
  return (
    <div className={styles.snowflakes} aria-hidden="true">
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
    </div>
  );
}
