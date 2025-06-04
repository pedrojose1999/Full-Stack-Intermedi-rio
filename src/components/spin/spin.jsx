import styles from "./spin.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
