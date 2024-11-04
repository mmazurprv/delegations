import { LoginForm } from "@/components/auth/login-form";

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center items-center">
      <LoginForm />
    </div>
  );
}
