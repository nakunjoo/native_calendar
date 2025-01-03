import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo'

import { dataServiceKey } from '../configs/data.service';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/index';
import { getOptions } from '../store/slices/option-slices';
import { ScheduleData, setSchedule } from '../store/slices/schedule-slices';
import { CategoryData, setCategory } from '../store/slices/category-slices';

import {
  dayData,
  calendarDateData,
  lunarDateData,
} from '../types/Calendar.types';

import { styles } from '../styles/Calendar';


export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const userOptions = useSelector(
    (state: RootState) => state.optionReducer.value
  );
  const categoryList: CategoryData[] = useSelector(
    (state: RootState) => state.categoryReducer
  );
   const scheduleList = useSelector((state: RootState) => state.scheduleReducer);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectDay, setSelectDay] = useState<dayData | null>(null);
  const [addSchedule, setAddSchedule] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  const [rows, setRows] = useState<dayData[][]>([]);
  const [holidayList, setHolidayList] = useState<
    calendarDateData[] | undefined
  >(undefined); // 국경일
  const [lunarList, setLunarList] = useState<lunarDateData[] | undefined>(
    undefined
  ); // 음력
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const solYear = format(currentMonth, 'yyyy');
  const solMonth = format(currentMonth, 'MM');

useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const toDay = new Date();
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(endOfWeek(monthEnd), 7)
    let days = [];
    let rowArr = [];
    let day = startDate;
    let index = 1;
    const scheduleBar = [];
    const scheduleCircle = [];
    if (scheduleList.length > 0) {
      for (const schedule of scheduleList) {
        if (
          format(schedule.startDate, 'yyyyMMdd') <
          format(schedule.endDate, 'yyyyMMdd')
        ) {
          const start = startOfDay(new Date(schedule.startDate));
          const end = endOfDay(new Date(schedule.endDate));
          for (let i = start; i <= end; i = addDays(i, 1)) {
            const data = {
              id: schedule.id,
              startDate: format(i, 'yyyy-MM-DD 00:00'),
              endDate: format(i, 'yyyy-MM-DD 23:59'),
              category: schedule.category,
              title: schedule.title,
              memo: schedule.memo,
              type: 'between',
              turn: 0,
              start: format(start, 'yyyy-MM-DD HH:mm'),
              end: format(end, 'yyyy-MM-DD HH:mm'),
            };
            if (
              format(i, 'yyyy-MM-DD') ===
              format(schedule.startDate, 'yyyy-MM-DD')
            ) {
              data.startDate = schedule.startDate;
              data.type = 'start';
            }
            if (
             format(i, 'yyyy-MM-DD') ===
            format(schedule.endDate, 'yyyy-MM-DD')
            ) {
              data.endDate = schedule.endDate;
              data.type = 'end';
            }
            scheduleBar.push(data);
          }
        } else {
          scheduleCircle.push(schedule);
        }
      }
    }

    const sortSchedule = (schedules: ScheduleData[]) => {
      return schedules.sort(
        (a, b): number => +new Date(a.start) - +new Date(b.start)
      );
    };
    const startArrs: any = {};
    while (day <= endDate) {
      index++;
      for (let i = 0; i < 7; i++) {
        const formatDate = format(day, "yyyyMMdd");
        const schedule_bar = [];
        const schedule_circle = [];
        if (scheduleBar.length > 0) {
          for (const schedule of sortSchedule(scheduleBar)) {
            if (formatDate === format(schedule.startDate, "yyyyMMdd")) {
              schedule.turn = schedule_bar.length;
              if (schedule.type === "start") {
                if (schedule.turn === 1) {
                  if (
                    schedule_bar[0].turn === 1 ||
                    schedule_bar[0].turn === 2
                  ) {
                    schedule.turn = 0;
                  }
                } else if (schedule.turn === 2) {
                  if (
                    (schedule_bar[0].turn === 0 ||
                      schedule_bar[0].turn === 2) &&
                    (schedule_bar[1].turn === 0 || schedule_bar[1].turn === 2)
                  ) {
                    schedule.turn = 1;
                  } else if (
                    (schedule_bar[0].turn === 1 ||
                      schedule_bar[0].turn === 2) &&
                    (schedule_bar[1].turn === 1 || schedule_bar[1].turn === 2)
                  ) {
                    schedule.turn = 0;
                  }
                } else if (schedule.turn > 2) {
                  let empty_turn_0 = true;
                  let empty_turn_1 = true;
                  let empty_turn_2 = true;
                  for (const bar of schedule_bar) {
                    if (bar.turn === 0) {
                      empty_turn_0 = false;
                    } else if (bar.turn === 1) {
                      empty_turn_1 = false;
                    } else if (bar.turn === 2) {
                      empty_turn_2 = false;
                    }
                  }
                  if (empty_turn_2) {
                    schedule.turn = 2;
                  } else if (empty_turn_1) {
                    schedule.turn = 1;
                  } else if (empty_turn_0) {
                    schedule.turn = 0;
                  }
                }
                startArrs[schedule.id] = schedule.turn;
              } else {
                if (startArrs[schedule.id] >= 0) {
                  schedule.turn = startArrs[schedule.id];
                }
              }

              schedule_bar.push(schedule);
            }
          }
        }
        if (scheduleCircle.length > 0) {
          for (const schedule of sortSchedule(scheduleCircle)) {
            if (formatDate === format(schedule.startDate, "yyyyMMdd")) {
              schedule_circle.push(schedule);
            }
          }
        }

        const schedules = sortSchedule([...schedule_bar, ...schedule_circle]);

        let holiday = {
          name: "",
          isHoliday: "",
        };
        if (userOptions.holiday && holidayList) {
          for (const item of holidayList) {
            if (formatDate === String(item.locdate)) {
              holiday.name = item.dateName;
              holiday.isHoliday = item.isHoliday;
            }
          }
        }

        let lunar = "";
        if (userOptions.lunar && lunarList) {
          for (const item of lunarList) {
            if (
              formatDate === `${item.solYear}${item.solMonth}${item.solDay}`
            ) {
              lunar = `${item.lunMonth}/${item.lunDay}`;
            }
          }
        }

        const state = !isSameMonth(day, monthStart)
          ? "disabled"
          : isSameDay(day, toDay)
          ? "selected"
          : format(currentMonth, "M") !== format(day, "M")
          ? "not-valid"
          : "valid";

        const dayData: dayData = {
          formatDate,
          state,
          holiday,
          lunar,
          day,
          schedules,
          schedule_bar,
          schedule_circle,
        };

        if (selectDay) {
          if (format(selectDay.day, "yyyyMMdd") === formatDate) {
            setSelectDay(dayData);
          }
        }

        days.push(dayData);
        day = addDays(day, 1);
      }
      if (index < 8) {
        rowArr.push(days);
      }
      days = [];
    }
    setRows(rowArr);
  }, [
    holidayList,
    lunarList,
    scheduleList,
  ]);

    return (
        <SafeAreaView style={styles.wrap}>
          <View style={styles.container}> 
            {/* header */}
            <View style={styles.headerWrap}>
              <View style={styles.headerDate}>
                <Text style={styles.headerYear}>
                  {format(currentMonth, "yyyy")}
                </Text>
                <Text style={[styles.headerMonth, {color: userOptions.themeColor}]}>
                  {format(currentMonth, "M")}月
                </Text>
              </View>
              <View style={styles.headerButtons}>
                <Text style={styles.headerButton}>
                  <Icon name="plus" size={40} color={userOptions.themeColor} />
                </Text>
                <Text style={styles.headerButton}>
                  <Icon name="dots-three-horizontal" size={40} color={userOptions.themeColor} />
                </Text>
              </View>
            </View>
            {/* header-end */}
            {/* calendar */}
            {/* calendar-head */}
            <View style={styles.calendarWrap}>
              <View style={styles.calendarHead}>
                {date.map((value, index) => {
                  return (
                    <View style={styles.calendarDate} key={`date-${value}`}>
                      <Text 
                        style={[styles.calendarDateText, 
                        (index === 0) 
                        ? styles.textRed 
                        : (index === 6) 
                        ? styles.textBlue 
                        : styles.textBlack]}
                      >
                        {value}
                        </Text>
                    </View>
                  )
                })}
              </View>
              {/* calendar-head-end */}
              {/* calendar-body */}
              <View style={styles.calendarBody}>
                {
                  rows.map((days, index) => {
                    return (
                      <View style={styles.calendarDays} key={`rows-${index}`}>
                        {
                          days.map((day:dayData, i: number) => {
                            const formattedDate = format(day.day, "d");
                            return (
                              <View style={[(i === 6) ? styles.noBorderDay : styles.calendarDay, (day.state === 'disabled' ? styles.disabled : '')]} key={`day-${day.formatDate}`}>
                                <Text style={
                                  [styles.calendarDayText,
                                  (i === 0) 
                                  ? styles.textRed 
                                  : (day.holiday.isHoliday === 'Y')
                                  ? styles.textRed
                                  : (i === 6) 
                                  ? styles.textBlue 
                                  : (day.state === 'disabled')
                                  ? styles.textGray
                                  : styles.textBlack,
                                  (day.state === 'selected' 
                                    ? {
                                      backgroundColor: userOptions.themeColor, 
                                      color: '#fff',
                                      borderRadius: 50,
                                      width: 20,
                                      height: 20,
                                      textAlign: 'center',
                                    } 
                                    : '')
                                  ]}
                                  >
                                    {formattedDate}
                                  </Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    )
                  })
                }
              </View>
              {/* calendar-body-end */}
            </View>
            {/* calendar-end */}
            <View style={styles.categoryWrap}>

            </View>
          </View>
        </SafeAreaView>
    )
}
