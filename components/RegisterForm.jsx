import styles from "@/styles/RegisterForm.module.css";
import {
  ALL_FIELDS_ARE_NECESSARY,
  DEFAULT_USER_REGISTRATION_ERROR,
} from "@/utility/constants";
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

  const clearFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const buildFormErrorText = (error) => {
    let formErrorText = !error.message
      ? DEFAULT_USER_REGISTRATION_ERROR
      : error.message;

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      formErrorText =
        "User registration service is down. Please try again later";
    }

    if (
      error instanceof SyntaxError &&
      error.message ===
        `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
    ) {
      formErrorText =
        "Issue parsing server response data. Please try again later";
    }

    setError(formErrorText);
  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError(ALL_FIELDS_ARE_NECESSARY);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      clearFormFields();
      // Navigate to Dashboard page
    } catch (error) {
      // TODO: Log error in client logs
      // clientLogger.log(error)
      buildFormErrorText(error);
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
