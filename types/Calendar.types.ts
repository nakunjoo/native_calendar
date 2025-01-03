import { ScheduleData } from '../store/slices/schedule-slices';

export type dayData = {
  day: Date;
  formatDate: string;
  state: string;
  holiday: {
    name: string;
    isHoliday: string;
  };
  lunar: string;
  schedules: ScheduleData[];
  schedule_bar: ScheduleData[];
  schedule_circle: ScheduleData[];
};

export type calendarDateData = {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
};

export type lunarDateData = {
  lunDay: string | number;
  lunIljin: string;
  lunLeapmonth: string;
  lunMonth: string | number;
  lunNday: string | number;
  lunSecha: string;
  lunWolgeon: string;
  lunYear: number;
  solDay: string | number;
  solJd: number;
  solLeapyear: string | number;
  solMonth: string | number;
  solWeek: string;
  solYear: number;
};
