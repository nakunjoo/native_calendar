import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo'

import { styles } from '../styles/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/index';

import {
  dayData,
  calendarDateData,
  lunarDateData,
} from '../types/Calendar.types';

export default function CalendarBody({rows}:{
    rows: dayData[][]
}) {
    const userOptions = useSelector(
        (state: RootState) => state.optionReducer.value
      );
    const date = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <View style={styles.calendarWrap}>
            
        {/* calendar-head */}
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
    )
}