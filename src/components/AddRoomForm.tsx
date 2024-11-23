import React, { useState, type FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { type RoomFormData } from "../types/room";

export default function AddRoomForm(): JSX.Element {
  const [formData, setFormData] = useState<RoomFormData>({
    name: "",
    maxCapacity: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "rooms"), {
        ...formData,
        currentCapacity: 0,
      });

      setFormData({ name: "", maxCapacity: 0 });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Room Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Capacity
        </label>
        <input
          type="number"
          value={formData.maxCapacity}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              maxCapacity: parseInt(e.target.value),
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Room
      </button>
    </form>
  );
}
