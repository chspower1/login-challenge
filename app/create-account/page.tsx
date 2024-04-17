import SubmitButton from "@/components/submit-button";
import { createAccountAction } from "./action";

const CreateAccountPage = () => {
  return (
    <>
      <h1>Create Account</h1>
      <form action={createAccountAction}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" id="email" name="email" />
        </div>
        <SubmitButton>create account</SubmitButton>
      </form>
    </>
  );
};
export default CreateAccountPage;
