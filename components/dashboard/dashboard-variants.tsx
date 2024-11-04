import Link from "next/link";
import { Button } from "../ui/button";
import TripsTable from "./trips-table";
import { startDelegation } from "@/lib/actions/forms";

export function NoDelegation() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">🚀 Dashboard</h1>
      <h2 className="text-xl text-gray-600">😕 No Active Delegation</h2>
      <p className="text-center text-gray-500">
        It looks like you haven &apos t started a delegation yet. Start one now
        to begin tracking your trips!
      </p>
      <form action={startDelegation} className="mt-4">
        <Button>Start Delegation ✨</Button>
      </form>
    </div>
  );
}

export function DelegationNoTrip({ delegation, trips }: any) {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">📋 Dashboard</h1>
      <h2 className="text-xl text-gray-600">
        🚗 Active Delegation: {delegation.id}
      </h2>
      {trips.length > 0 ? (
        <TripsTable trips={trips} />
      ) : (
        <p className="text-gray-500">You haven &apos t added any trips yet.</p>
      )}
      <Button asChild>
        <Link href={`dashboard/start-trip?delegation=${delegation.id}`}>
          Add Trip ➕
        </Link>
      </Button>
    </div>
  );
}

export default function DelegationTrip({ delegation, trips }: any) {
  return (
    <div className="animate-in flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">🏁 Dashboard</h1>
      <h2 className="text-xl text-gray-600">
        🛣️ Active Delegation with Ongoing Trip
      </h2>
      <TripsTable trips={trips} />
      <Button asChild>
        <Link href={`dashboard/end-trip?delegation=${delegation.id}`}>
          End Trip
        </Link>
      </Button>
    </div>
  );
}
