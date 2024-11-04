import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center mt-20 gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Button asChild>
        <Link href="/dashboard/delegations">Go Back</Link>
      </Button>
    </div>
  );
}
