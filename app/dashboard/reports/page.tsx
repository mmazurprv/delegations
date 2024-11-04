import GenerateReportButton from "@/components/dashboard/generate-raport-btn";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <GenerateReportButton />
      </div>
    </div>
  );
}
