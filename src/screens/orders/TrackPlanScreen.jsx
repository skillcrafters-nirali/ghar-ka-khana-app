import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';
import CurvedBottomNav from '../../components/ui/CurvedBottomNav';

const TrackPlanScreen = ({ navigation,route }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'Matoshree Dabbawala',
      month: 'September',
      deliveredDays: [11, 17],
      missedDays:[2,20],
      currentDay: 22,
      totalDays: 30
    },
    {
      id: 2,
      name: 'Jagadamb Tiffin',
      month: 'September',
      deliveredDays: [2,8,11,16,20],
      missedDays:[4,12],
      currentDay: 28,
      totalDays: 30
    }
  ];

  const mockState = {
    index:1,
    routes:[
      {key:'home',name:'Home'},
      {key:'cart',name:'Cart' },
      {key:'favorite',name:'Favorite'},
      {key:'profile',name:'Profile'}
    ]
  };

  const getDaysInMonth = () => {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  };

  const getDayStatus = (day, plan) => {
    if (plan.missedDays && plan.missedDays.includes(day)) {
      return 'missed';
    }
    if (plan.deliveredDays.includes(day)) {
      return 'delivered';
    }
    if (day === plan.currentDay) {
      return 'current';
    }
    return 'upcoming';
  };
  
  const getDayStyle = (status) => {
    switch (status) {
      case 'delivered':
        return styles.deliveredDay;
      case 'current':
        return styles.currentDay;
      case 'missed':
        return styles.missedDay;
      default:
        return styles.upcomingDay;
    }
  };

  const getDayTextStyle = (status) => {
    switch (status) {
      case 'delivered':
        return styles.deliveredDayText;
      case 'current':
        return styles.currentDayText;
      case 'missed':
        return styles.missedDayText;
      default:
        return styles.upcomingDayText;
    }
  };

  const renderCalendar = (plan,key) => {
    const days = getDaysInMonth();
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
      <View key={key} style={{marginBottom:20}}>
                <Text style={styles.planTitle}>Plan #{plan.id}</Text>
                <View style={styles.planWrapper} >
          <View style={styles.planCard}>
         <View style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>{plan.month}</Text>
          </View>
          
          <View style={styles.weekDaysRow}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.daysGrid}>
            {days.map((day) => {
              const status = getDayStatus(day, plan);
              return (
                <TouchableOpacity
                  key={`${plan.id}-${day}`}
                  style={[styles.dayCell, getDayStyle(status)]}
                  onPress={() => setSelectedPlan(plan.id)}
                >
                  <Text style={[styles.dayText, getDayTextStyle(status)]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <Text style={styles.providerName}>{plan.name}</Text>
        
        {/* {plan.id === 2 && (
          <Button
            title="Renew Plan"
            variant="primary"
            size='large'
            style={styles.renewButton}
            onPress={() => navigation.navigate('MenuSubscription')}
          />
        )} */}
      </View>
      </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Track Your Plan</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="information-circle-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {plans.map((plan) => renderCalendar(plan,plan.id))}
      </ScrollView>
      <View style={styles.buttonContainer}>
      <Button
        title="Renew Plan"
        variant="primary"
        size='large'
        style={styles.renewButton}
        onPress={() => navigation.navigate('MenuSubscription')}
      />
    </View>
   <CurvedBottomNav state={mockState} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  planWrapper: {
    padding:10,
    borderRadius:18,
    borderWidth:1,
  },
  
 container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10
  },
  backButton: {
    padding: 4
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary
  },
  helpButton: {
    padding: 4
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
  },
  planTitle: {
    fontSize: 14,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 6,
    marginLeft:6,
    alignSelf:'flex-start',
    backgroundColor: colors.bgLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    
  },
  calendarContainer: {
    marginBottom: 16
  },
  monthHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8
  
  },
  monthText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    borderWidth: 2,
    borderColor: colors.border,
   borderRadius: 6,
   paddingVertical: 4,
   paddingHorizontal: 12
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4
  },
  weekDayText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    width: 32,
    textAlign: 'center'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4
  },
  dayCell: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  dayText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular
  },
  deliveredDay: {
    backgroundColor: colors.primary
  },
  deliveredDayText: {
    color: colors.surface,
    fontFamily: fonts.family.medium
  },
  currentDay: {
    backgroundColor: colors.warning
  },
  currentDayText: {
    color: colors.surface,
    fontFamily: fonts.family.bold
  },
  missedDay: {
    backgroundColor: colors.accent
  },
  missedDayText: {
    color: colors.surface
  },
  upcomingDay: {
    backgroundColor: 'transparent'
  },
  upcomingDayText: {
    color: colors.textSecondary
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 8
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    marginBottom:80,
  },
  renewButton: {
    marginTop: 12
  },
});


export default TrackPlanScreen;