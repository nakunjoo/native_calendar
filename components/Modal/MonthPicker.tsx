import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Pressable, Modal, StyleSheet,ScrollView, findNodeHandle, AccessibilityInfo } from 'react-native';
import { format } from 'date-fns';
import Swiper from 'react-native-swiper';

export default function MonthPicker({
    isModalVisible, 
    setIsModalVisible, 
    yearList, 
    monthList
}: {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    yearList: string[],
    monthList: string[]
}) {
    const scrollRef = useRef(null)
    const selectYearRef = useRef(null) as any

    useEffect(()=>{
        if (!isModalVisible) return 
        
        if (selectYearRef.current) {
            console.log('selectYearRef:', selectYearRef.current)
            selectYearRef.current.focus()
        }
    },[isModalVisible])

    return (
        <View>
            <Modal 
                animationType='slide' 
                visible={isModalVisible} 
                transparent={true}
                onRequestClose={()=>{
                    setIsModalVisible(false)
                }}
            >
                <Pressable onPress={()=>{
                    setIsModalVisible(false)
                }} style={styles.closeBg} />

                <View style={styles.modal}>
                    <View style={styles.scrollViewWrap}>
                        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}
                        >
                            { yearList.map((year:string, i:number) => {
                                return (
                                    <View ref={(year === '2025') ? selectYearRef:null} tabIndex={0} style={styles.slide} key={`month-year-${i}`}>
                                        <Text style={styles.slideText}>{year}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  closeBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  modal: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    zIndex: 5,
  },
  scrollViewWrap: {
    width: 150,
    height: 250,
    padding: 20,
    borderWidth: 1,
    overflow: 'hidden'
  },
  slide: {
    width: 100,
  },
  slideText: {
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
  }
})