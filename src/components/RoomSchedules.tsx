import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { type Schedule } from "../types/schedule";
import type { Room } from "@/types/room";

export default function RoomSchedules({
  room,
  className,
  scheduleComponent,
}: {
  room: Room;
  className?: string;
  scheduleComponent?: (schedule: Schedule) => JSX.Element;
}): JSX.Element {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, `rooms/${room.id}/schedules`),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const schedulesData = snapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Schedule
          )
          .toSorted((a, b) => {
            const aTime = `${a.startTimeHours.toString().padStart(2, "0")}:${a.startTimeMinutes.toString().padStart(2, "0")}`;
            const bTime = `${b.startTimeHours.toString().padStart(2, "0")}:${b.startTimeMinutes.toString().padStart(2, "0")}`;
            return aTime.localeCompare(bTime);
          });
        setSchedules(schedulesData);
      }
    );

    return () => unsubscribe();
  }, [room.id]);

  return (
    <div className={clsx("space-y-4", className)}>
      {schedules.map((schedule, index) =>
        scheduleComponent ? (
          scheduleComponent(schedule)
        ) : (
          <RoomSchedule key={index} schedule={schedule} room={room} />
        )
      )}
    </div>
  );
}

function RoomSchedule({
  schedule,
  room,
}: {
  schedule: Schedule;
  room: Room;
}): JSX.Element {
  const isLive = room.activeSessionId === schedule.id;
  const isCompleted = schedule.completed;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-black">
      <h2 className="text-xl font-bold mb-2">{schedule.title}</h2>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div
            className={`w-4 h-4 rounded-full ${
              isCompleted
                ? "bg-black"
                : `bg-green-500 ${
                    isLive ? "animate-[flash_1.5s_ease-in-out_infinite]" : ""
                  }`
            }`}
          ></div>
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
      <p
        className={`mt-2 font-bold ${
          isCompleted
            ? "text-black"
            : isLive
              ? "text-green-600"
              : "text-blue-600"
        }`}
      >
        {isCompleted ? "COMPLETED" : isLive ? "LIVE" : "UPCOMING"}
      </p>
    </div>
  );
}
