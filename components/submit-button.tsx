"use client";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children?: React.ReactNode;
}
const SubmitButton = ({ children = "submit" }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{children}</button>;
};
export default SubmitButton;
