import RegisterForm from "@/components/RegisterForm";
import styles from "@/styles/Register.module.css";

const Register = () => {
  return (
    <div className={styles.registerPageBackground}>
      <RegisterForm />
    </div>
  );
};

export default Register;
