import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h1 className={styles.cardHeader}>Enter the details</h1>
        <form className={styles.form}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className={styles.loginFormButton}>Login</button>
          <div className={styles.formErrorMessage}>Error message</div>
          <Link href={"/register"} className={styles.registerLink}>
            Don't have an account? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
