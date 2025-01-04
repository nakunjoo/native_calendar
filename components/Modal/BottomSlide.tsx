import React, {useEffect, useState} from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import MonthPicker from './MonthPicker';


export default function BottomSlide({isModalVisible, setIsModalVisible, type}: {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    type: string
}) {
    const [yearList, setYearList] = useState<string[]>([])
    const [monthList, setMonthList] = useState<string[]>([]);
    const [hourList, setHourList] = useState<string[]>([]);
    const [minList, setMinList] = useState<string[]>([]);

    const [startDayList, setStartDayList] = useState<string[]>([]);
    const [endDayList, setEndDayList] = useState<string[]>([]);

    useEffect(() => {
    const year = parseInt(format(new Date(), "yyyy"));
    const years = [];
    const months = [];
    const hours = [];
    const mins = [];
    for (let i = year - 50; i < year + 50; i++) {
      years.push(`${i}`);
    }
    for (let i = 1; i < 13; i++) {
      let str = "";
      if (i < 10) {
        str = `0${i}`;
      } else {
        str = `${i}`;
      }
      months.push(str);
    }
    for (let i = 0; i < 24; i++) {
      let str = "";
      if (i < 10) {
        str = `0${i}`;
      } else {
        str = `${i}`;
      }
      hours.push(str);
    }
    for (let i = 0; i < 60; i++) {
      let str = "";
      if (i < 10) {
        str = `0${i}`;
      } else {
        str = `${i}`;
      }
      mins.push(str);
    }
    setYearList(years);
    setMonthList(months);
    setHourList(hours);
    setMinList(mins);
  }, []);

    return (
        <View style={styles.headerModal}>
            <Modal 
                animationType='fade' 
                visible={isModalVisible} 
                transparent={true}
                onRequestClose={()=>{
                    setIsModalVisible(false)
                }}
            >
                <View style={styles.modalBg} />
            </Modal>
            { type === 'month' ? (
                <MonthPicker 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible} 
                yearList={yearList} 
                monthList={monthList}
                />
            ) : (<></>)}
        </View>
    )
}
const styles = StyleSheet.create({
  headerModal: {
    position: 'absolute',
  },
  modalBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3,
  },
})