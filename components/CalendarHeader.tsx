import React, {useEffect, useState, useCallback} from 'react';
import { Text, View, Pressable, Modal } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo'

import { styles } from '../styles/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/index';

import MonthPicker from './Modal/MonthPicker';

export default function CalendarHeader({currentMonth}:{
    currentMonth: Date
}) {
    const [date, setDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const userOptions = useSelector(
        (state: RootState) => state.optionReducer.value
      );


    return (
        <View style={styles.headerWrap}>
            <Pressable style={styles.headerDate} onPress={()=>{
                setIsModalVisible(true)
            }}>
                <Text style={styles.headerYear}>
                    {format(currentMonth, "yyyy")}
                </Text>
                <Text style={[styles.headerMonth, {color: userOptions.themeColor}]}>
                    {format(currentMonth, "M")}월
                </Text>
            </Pressable>
            <View style={styles.headerButtons}>
                <Text style={styles.headerButton}>
                    <Icon name="plus" size={40} color={userOptions.themeColor} />
                </Text>
                <Text style={styles.headerButton}>
                    <Icon name="dots-three-horizontal" size={40} color={userOptions.themeColor} />
                </Text>
            </View>
            {/* Modal */}
           <MonthPicker isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </View>
    )
}