import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import RoomCard from "./RoomCard";
import { type Room } from "../types/room";

export default function RoomList(): JSX.Element {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const roomsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }) as Room).toSorted((a, b) => a.order - b.order); 
        setRooms(roomsData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
