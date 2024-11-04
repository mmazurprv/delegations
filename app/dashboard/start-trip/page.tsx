import { StartTripForm } from "@/components/dashboard/start-trip-form";
import { getUser } from "@/lib/auth";
import { getActiveDelegation, getCarsByUser } from "@/lib/db/queries";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }
  const cars = await getCarsByUser(user.id);
  const carsModels = cars.map((car) => car.model);

  const activeDelegation = await getActiveDelegation(user.id);
  if (!activeDelegation) {
    return notFound();
  }

  return (
    <div className="h-full flex justify-center items-center">
      <StartTripForm
        delegationId={activeDelegation.id}
        possibleCars={carsModels}
      />
    </div>
  );
}
