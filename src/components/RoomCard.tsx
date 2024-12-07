import React from "react";
import { type Room } from "../types/room";
import RoomSchedules from "./RoomSchedules";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps): JSX.Element {
  const occupancyPercentage = (room.currentCapacity / room.maxCapacity) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-black">
      <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              occupancyPercentage >= 90
                ? "bg-red-600"
                : occupancyPercentage >= 70
                  ? "bg-yellow-400"
                  : "bg-green-500"
            }`}
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div>
      </div>
      <p className="text-gray-600">
        {room.currentCapacity} / {room.maxCapacity} seats occupied
      </p>
      <p
        className={`font-bold ${
          room.currentCapacity >= room.maxCapacity
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {room.currentCapacity >= room.maxCapacity ? "FULL" : "AVAILABLE"}
      </p>

      <RoomSchedules className="mt-4" room={room} />
    </div>
  );
}
