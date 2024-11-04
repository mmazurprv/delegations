import DelegationTrip, {
  DelegationNoTrip,
  NoDelegation,
} from "@/components/dashboard/dashboard-variants";
import { getUser } from "@/lib/auth";
import { getActiveDelegation, getTripsForDelegation } from "@/lib/db/queries";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const activeDelegation = await getActiveDelegation(user.id);

  if (!activeDelegation) {
    return <NoDelegation />;
  }

  const trips = await getTripsForDelegation(activeDelegation.id, user.id);

  const hasActiveTrip = trips.some((trip) => trip.status === "active");

  if (!hasActiveTrip) {
    return <DelegationNoTrip delegation={activeDelegation} trips={trips} />;
  }

  return <DelegationTrip delegation={activeDelegation} trips={trips} />;
}
