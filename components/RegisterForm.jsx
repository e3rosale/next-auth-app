import styles from "@/styles/RegisterForm.module.css";
import Link from "next/link";
import { useState } from "react";

const DisplayFormError = ({ error }) => {
  if (!error) {
    return false;
  }

  return <div className={styles.formErrorMessage}>{error}</div>;
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are necessary");
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      <h1 className={styles.registerFormHeader}>Register</h1>
      <form className={styles.registerForm} onSubmit={handleRegisterFormSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={styles.registerButton}>Register</button>
        <DisplayFormError error={error} />
        <Link href={"/"} className={styles.loginLink}>
          Have an account? <span>Login</span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
