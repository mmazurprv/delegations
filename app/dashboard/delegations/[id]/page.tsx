import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/lib/auth";
import { getTripsForDelegation } from "@/lib/db/queries";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: number } }) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  const id = params.id;

  const trips = await getTripsForDelegation(id, user.id);

  if (!trips.length) {
    return notFound();
  }

  return (
    <div className="p-10 flex flex-col justify-center items-center h-full w-full">
      <Table className="">
        <TableCaption>A list of all trips</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Start Location</TableHead>
            <TableHead>End Location</TableHead>
            <TableHead>Trip Description</TableHead>
            <TableHead>Start Meter</TableHead>
            <TableHead>End Meter</TableHead>
            <TableHead>Car Id</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.startTime.toLocaleString()}</TableCell>
              <TableCell>
                {trip.endTime ? trip.endTime.toLocaleString() : "N/A"}
              </TableCell>
              <TableCell>{trip.startLocation}</TableCell>
              <TableCell>{trip.endLocation}</TableCell>
              <TableCell>{trip.tripDescription}</TableCell>
              <TableCell>{trip.startMeter}</TableCell>
              <TableCell>{trip.endMeter ? trip.endMeter : "N/A"}</TableCell>
              <TableCell>{trip.carId}</TableCell>
              <TableCell>{trip.lastUpdated.toLocaleString()}</TableCell>
              <TableCell>{trip.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
