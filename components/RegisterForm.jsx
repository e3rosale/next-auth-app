import styles from "@/styles/RegisterForm.module.css";
import {
  ALL_FIELDS_ARE_NECESSARY,
  DEFAULT_USER_REGISTRATION_ERROR,
  ISSUE_PARSING_SERVER_RESPONSE_DATA,
  USER_REGISTRATION_SERVICE_UNAVAILABLE,
} from "@/utility/constants";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const buildFormErrorText = (error) => {
    let formErrorText = error.message || DEFAULT_USER_REGISTRATION_ERROR;

    if (formErrorText === "Failed to fetch") {
      formErrorText = USER_REGISTRATION_SERVICE_UNAVAILABLE;
    }

    if (
      formErrorText ===
      `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
    ) {
      formErrorText = ISSUE_PARSING_SERVER_RESPONSE_DATA;
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

      router.push("/");
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
