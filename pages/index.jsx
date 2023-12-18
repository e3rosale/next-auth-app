import LoginForm from "@/components/LoginForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Home;
