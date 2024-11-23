import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import AddRoomForm from "./AddRoomForm";
import UpdateCapacityForm from "./UpdateCapacityForm";
import type { Room, UpdateCapacityData } from "../types/room";

export default function AdminDashboard(): JSX.Element {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const roomsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Room[];
        setRooms(roomsData);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateCapacity = async ({
    roomId,
    newCapacity,
  }: UpdateCapacityData): Promise<void> => {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      currentCapacity: newCapacity,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
        <AddRoomForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Update Room Capacity</h2>
        {rooms.map((room) => (
          <UpdateCapacityForm
            key={room.id}
            room={room}
            onUpdate={updateCapacity}
          />
        ))}
      </div>
    </div>
  );
}
