import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Pressable, StyleSheet, Modal, ScrollView, findNodeHandle, AccessibilityInfo } from 'react-native';
import { format, subYears, addYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { setCurrentDate } from '../../store/slices/month-slices';
import Icon from 'react-native-vector-icons/Entypo'

export default function MonthPicker({
    isModalVisible,
    setIsModalVisible, 
}: {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const userOptions = useSelector(
        (state: RootState) => state.optionReducer.value
    );
    const currentMonth: Date = useSelector(
        (state: RootState) => state.monthReducer.currentMonth
    );
    const [selYear, setSelYear] = useState<string>(format(currentMonth, 'yyyy'))
    const dispatch = useDispatch<AppDispatch>();
    const monthList = ['1','2','3','4','5','6','7','8','9','10','11','12']
    const m = format(currentMonth, 'M')
    const year = format(currentMonth, 'yyyy')

    return (
        <Modal 
            style={{position: 'relative'}}
            visible={isModalVisible}
            animationType='fade' 
            transparent={true}
            onRequestClose={()=>{
                setIsModalVisible(false)
            }}
        >
            <Pressable style={styles.closeBg} onPress={()=>{
                setIsModalVisible(false)
            }} />
            <View style={styles.modal}>
                <View style={styles.yearBox}>
                    <Pressable onPress={()=>{
                        setSelYear(format(subYears(selYear, 1), 'yyyy'))
                    }}>
                        <Icon name="chevron-left" size={40} color={userOptions.themeColor} />
                    </Pressable>
                    <Text style={styles.yearText}>{selYear}</Text>
                    <Pressable onPress={()=>{
                        setSelYear(format(addYears(selYear, 1), 'yyyy'))
                    }}>
                        <Icon name="chevron-right" size={40} color={userOptions.themeColor} />
                    </Pressable>
                </View>
                <View style={styles.monthList}>
                    {monthList.map((month, i)=>{
                        return (
                            <View style={styles.month} key={`modal-month-${month}`}>
                                <View style={[(`${year}${m}` === `${selYear}${month}`) ? styles.monthActionBg : styles.monthBg, {backgroundColor: userOptions.themeColor}]} />
                                <Pressable onPress={()=>{
                                    dispatch(setCurrentDate([selYear, month]))
                                    setIsModalVisible(false)
                                }}>
                                    <Text style={(`${year}${m}` === `${selYear}${month}`) ? styles.monthActionText : styles.monthText}>{month}월</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  closeBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 1,
  },
  modal: {
    borderWidth: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
        {translateX: '-50%'},
        {translateY: '-50%'},
    ],
    width: 350,
    height: 300,
    backgroundColor: '#fff',
    zIndex: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems:'center',
  },
  yearBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  monthList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 15,
  },
  month: {
    position: 'relative',
    width: 70,
    height: 55,
    borderWidth: 1,
    textAlign: 'center',
    margin: 7,
    borderRadius: 5,
  },
  monthBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 55,
    opacity: 0.2,
    borderRadius: 5,
  },
  monthActionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 55,
    borderRadius: 5,
  },
  monthText: {
    lineHeight: 55,
    fontSize: 16,
    textAlign: 'center',
  },
  monthActionText: {
    lineHeight: 55,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})