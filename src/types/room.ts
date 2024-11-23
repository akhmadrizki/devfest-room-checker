export interface Room {
  id: string;
  name: string;
  maxCapacity: number;
  currentCapacity: number;
}

export type RoomWithoutId = Omit<Room, "id">;

export interface RoomFormData {
  name: string;
  maxCapacity: number;
}

export interface UpdateCapacityData {
  roomId: string;
  newCapacity: number;
}