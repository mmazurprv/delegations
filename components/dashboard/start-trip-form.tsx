"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket, X, MapPin, Loader } from "lucide-react";
import { useActionState } from "react";
import { startTrip } from "@/lib/actions/forms";
import { handleGetLocation } from "@/lib/actions/geolocation";

export function StartTripForm({
  suggestedStartMeter = "",
  delegationId = 0,
  suggestedStartLocation = "",
  possibleCars = [""],
}) {
  const [error, formAction, isPending] = useActionState(startTrip, undefined);
  const [startLocation, setStartLocation] = useState(suggestedStartLocation);
  const [startMeter, setStartMeter] = useState(suggestedStartMeter);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize date and time state with current values
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  const currentTime = now.toTimeString().split(":").slice(0, 2).join(":"); // HH:MM format

  const [startDate, setStartDate] = useState(currentDate);
  const [startTime, setStartTime] = useState(currentTime);

  const handleLocationClick = () => {
    setIsLocating(true);
    handleGetLocation(
      (location) => {
        setStartLocation(location);
        setIsLocating(false);
      },
      (_error) => {
        alert("Unable to retrieve location.");
        setIsLocating(false);
      },
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form action={formAction}>
        <input type="hidden" name="delegationId" value={delegationId} />
        <CardHeader>
          <CardTitle>Delegation ID</CardTitle>
          <CardDescription>Start your trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="car">Car Selection</Label>
                <Select name="carModel">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a car" />
                  </SelectTrigger>
                  <SelectContent>
                    {possibleCars.map((car) => (
                      <SelectItem key={car} value={car}>
                        {car}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="start-meter">Start Meter</Label>
                <Input
                  id="start-meter"
                  name="startMeter"
                  type="number"
                  placeholder="0"
                  value={startMeter}
                  onChange={(e) => setStartMeter(e.target.value)}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <Label htmlFor="start-location">Start Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="start-location"
                    name="startLocation"
                    placeholder="Enter start location"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    disabled={isLocating}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={isLocating}
                    onClick={handleLocationClick}
                  >
                    {isLocating ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  name="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <Button
              variant="outline"
              className="hover:text-red-600 flex items-center gap-2 h-12"
              type="button"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isPending} // To implement prop
              className="flex items-center gap-2 h-12"
            >
              <Rocket className="h-4 w-4" />
              Start Trip
            </Button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}
