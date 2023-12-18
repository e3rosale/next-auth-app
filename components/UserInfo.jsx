import styles from "@/styles/UserInfo.module.css";

const UserInfo = () => {
  return (
    <div className={styles.userInfoBackground}>
      <div className={styles.userInfoContainer}>
        <p>
          Name: <span className={styles.userInfoSpan}>John</span>
        </p>
        <p>
          Email: <span className={styles.userInfoSpan}>john@gmail.com</span>
        </p>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </div>
  );
};

export default UserInfo;
