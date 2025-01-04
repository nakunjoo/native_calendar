import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor:'#fff',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textRed: {
    color: 'red'
  },
  textBlue: {
    color: 'blue'
  },
  textBlack: {
    color: 'black'
  },
  textGray: {
    color: '#555'
  },
  disabled: {
    backgroundColor: '#bababa',
    pointerEvents: 'none',
  },
  // header
  headerWrap: {
    flex: 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingLeft: 5,
  },
  headerDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerYear: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerMonth: {
    fontSize: 25,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    marginRight: 20,
  },
  
  
  // calendar
  calendarWrap: {
    flex: 0.86,
    width: '100%',
    borderTopWidth: 1,
  },
  // head
  calendarHead: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  calendarDate: {
    flex:1,
  },
  calendarDateText: {
    textAlign: 'center',
    padding:2,
    color: 'black'
  },
  // body
  calendarBody: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  calendarDays: {
    flex:1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    flex:1,
    borderRightWidth: 1,
    paddingLeft: 3,
    position: 'relative',
  },
  noBorderDay: {
    flex: 1,
    paddingLeft: 5,
  },
  calendarDayText: {
    marginTop: 3,
  },
  // category
  categoryWrap: {
    flex: 0.07,
  }
})