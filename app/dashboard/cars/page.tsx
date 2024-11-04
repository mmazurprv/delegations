import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-full flex justify-center items-center">
      Under Construction
    </div>
  );
}
