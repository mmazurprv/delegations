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
import { Rocket, X, MapPin, Loader, Home } from "lucide-react";
import { useActionState } from "react";
import { handleGetLocation } from "@/lib/actions/geolocation";
import { endTrip } from "@/lib/actions/forms";

export function EndTripForm({
  suggestedEndMeter = "",
  delegationId = 0,
  suggestedEndLocation = "",
  car = "Car",
}) {
  const [error, formAction, isPending] = useActionState(endTrip, undefined);
  const [endLocation, setEndLocation] = useState(suggestedEndLocation);
  const [endMeter, setEndMeter] = useState(suggestedEndMeter);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize date and time state with current values
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  const currentTime = now.toTimeString().split(":").slice(0, 2).join(":"); // HH:MM format

  const [endDate, setEndDate] = useState(currentDate);
  const [endTime, setEndTime] = useState(currentTime);

  const handleLocationClick = () => {
    setIsLocating(true);
    handleGetLocation(
      (location) => {
        setEndLocation(location);
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
          <CardDescription>End your trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="car">Car Selection</Label>
                <Select disabled name="carModel">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={car}>{car}</SelectItem>
                    ))
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="end-meter">End Meter</Label>
                <Input
                  id="end-meter"
                  name="endMeter"
                  type="number"
                  placeholder="0"
                  value={endMeter}
                  onChange={(e) => setEndMeter(e.target.value)}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <Label htmlFor="end-location">End Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="end-location"
                    name="endLocation"
                    placeholder="Enter end location"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    disabled={isLocating}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setEndLocation("Kleszczów")}
                  >
                    <Home className="h-4 w-4" />
                  </Button>
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
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  name="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
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
              End Trip
            </Button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}
