import HomeLogo from "../components/HomeLogo";
import WelcomeForm from "../components/WelcomeForm";

const WelcomePage: React.FC = () => {
  return (
    <div className=" bg-blue-950  h-screen bg-cover px-6">
      <HomeLogo />
      <WelcomeForm />
    </div>
  );
};

export default WelcomePage;
