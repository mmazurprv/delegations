import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";

export default function TripsTable({ trips }: any) {
  return (
    <div className="p-10 flex flex-col justify-center items-center h-full w-full">
      <Card className="p-4">
        <Table className="">
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
            {trips.map((trip: any) => (
              <TableRow key={trip.tripId}>
                <TableCell>{trip.startTime.toLocaleString()}</TableCell>
                <TableCell>
                  {trip.endTime ? trip.endTime.toLocaleString() : "N/A"}
                </TableCell>
                <TableCell>{trip.startLocation}</TableCell>
                <TableCell>{trip.endLocation || "N/A"}</TableCell>
                <TableCell>{trip.tripDescription || "N/A"}</TableCell>
                <TableCell>{trip.startMeter}</TableCell>
                <TableCell>{trip.endMeter || "N/A"}</TableCell>
                <TableCell>{trip.carId}</TableCell>
                <TableCell>{trip.lastUpdated.toLocaleString()}</TableCell>
                <TableCell>{trip.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
