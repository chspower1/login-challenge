import SubmitButton from "@/components/submit-button";
import { loginAction } from "./action";
import { createAccountAction } from "../create-account/action";
import { useFormState } from "react-dom";

const LoginPage = () => {
  return (
    <>
      <h1>Login</h1>
      <form action={loginAction}>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" id="email" name="email" />
        </div>
        <SubmitButton>login</SubmitButton>
      </form>
    </>
  );
};
export default LoginPage;
