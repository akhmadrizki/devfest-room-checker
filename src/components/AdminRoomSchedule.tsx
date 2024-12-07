import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { type Schedule } from "../types/schedule";
import { type Room } from "../types/room";
import RoomSchedules from "./RoomSchedules";

function AdminRoomSchedule({
  schedule,
  room,
  onSessionClick,
}: {
  schedule: Schedule;
  room: Room;
  onSessionClick: (scheduleId: string) => void;
}): JSX.Element {
  const isLive = room.activeSessionId === schedule.id;

  const handleCompletedChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const scheduleRef = doc(db, `rooms/${room.id}/schedules/${schedule.id}`);
    await updateDoc(scheduleRef, {
      completed: e.target.checked,
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 mb-4 border ${
        isLive ? "border-green-500 border-2" : "border-black"
      } cursor-pointer hover:bg-gray-50`}
      onClick={() => onSessionClick(schedule.id)}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">{schedule.title}</h2>
        <div className="flex gap-4">
          <span>Completed</span>
          <input
            type="checkbox"
            checked={schedule.completed}
            onChange={handleCompletedChange}
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
            className="h-5 w-5"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">
            {schedule.startTimeHours.toString().padStart(2, "0")}:
            {schedule.startTimeMinutes.toString().padStart(2, "0")} -{" "}
            {schedule.endTimeHours.toString().padStart(2, "0")}:
            {schedule.endTimeMinutes.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      {schedule.speaker ? (
        <p className="text-gray-600">Speaker: {schedule.speaker}</p>
      ) : null}
      <p className={`mt-2 font-bold ${isLive ? "text-green-600" : ""}`}>
        {isLive ? "LIVE" : ""}
      </p>
    </div>
  );
}

export default function RoomSchedulesManager(): JSX.Element {
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

  const handleSessionClick = async (room: Room, scheduleId: string) => {
    const roomRef = doc(db, "rooms", room.id);
    if (room.activeSessionId === scheduleId) {
      await updateDoc(roomRef, {
        activeSessionId: null,
      });
    } else {
      await updateDoc(roomRef, {
        activeSessionId: scheduleId,
      });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Manage Sessions</h2>
      {rooms.map((room) => (
        <div key={room.id} className="mb-8">
          <h3 className="text-lg font-medium mb-4">{room.name}</h3>
          <RoomSchedules
            room={room}
            scheduleComponent={(schedule) => (
              <AdminRoomSchedule
                schedule={schedule}
                room={room}
                onSessionClick={(scheduleId) =>
                  handleSessionClick(room, scheduleId)
                }
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}
