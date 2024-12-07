export type Schedule = {
  id: string;
  startTimeHours: number;
  startTimeMinutes: number;
  endTimeHours: number;
  endTimeMinutes: number;
  speaker?: string;
  title: string;
  completed?: boolean;
};
