import {StyleSheet} from 'react-native';
import color from '../../Styles/color';
import {scale, moderateScale, verticalScale} from '../../Styles/scale';

const {white} = color;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: scale(60),
    fontWeight: 'bold',
  },
  city: {
    fontSize: scale(35),
  },
  dayWraper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    flex: 1,
    paddingHorizontal: moderateScale(14),
    alignItems: 'center',
  },
  day: {
    flex: 8,
    fontSize: scale(16),
  },
  dayTemp: {
    flex: 2,
    fontSize: scale(16),
  },
  errorContainer:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    paddingHorizontal:moderateScale(16),
    paddingVertical: verticalScale(16)
  },
  errorText:{
    fontSize: scale(34), 
    alignSelf:'center', 
    textAlign:'center'
  },
  buttonContainer: {
    marginTop:verticalScale(40), 
    borderWidth:2, 
    borderColor:'black', 
    paddingHorizontal:moderateScale(16),
    paddingVertical: verticalScale(16) 
   },
   buttonText:{
     fontSize: scale(20), 
     color: 'blue'
    }
});
