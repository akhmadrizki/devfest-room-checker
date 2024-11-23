import React, { useState, type FormEvent } from "react";
import type { Room, UpdateCapacityData } from "../types/room";

interface UpdateCapacityFormProps {
  room: Room;
  onUpdate: (data: UpdateCapacityData) => Promise<void>;
}

export default function UpdateCapacityForm({
  room,
  onUpdate,
}: UpdateCapacityFormProps): JSX.Element {
  const [capacity, setCapacity] = useState<number>(room.currentCapacity);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await onUpdate({
      roomId: room.id,
      newCapacity: capacity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg">
      <h3 className="font-medium mb-2">{room.name}</h3>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          min={0}
          max={room.maxCapacity}
          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span>/ {room.maxCapacity}</span>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Update
        </button>
      </div>
    </form>
  );
}
