import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../components/Search';
import EventBanner from '../components/EventBanner';
import EventImage from '../assets/Logos/w1.png';
import SearchBar from 'react-native-dynamic-search-bar';

function OrganizerDashboardScreen() {
  const Tab = createBottomTabNavigator();
  const user = {
    name: 'George',
  };

  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getMonth() + 1 + '-' + today.getDate();
    setDate(date);
    setMasterData(events);
    setPreviousData(eventsPast);
  }, []);

  const events = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Fashion Week',
      organizer: 'Lasalle College',
      date: 'May 21, 2020',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'ETS',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'FROSH',
      organizer: 'Concordia University',
      date: 'May 21, 2023',
    },
    {
      image: { EventImage },
      title: 'Film Festival',
      organizer: 'Cinema',
      date: 'May 21, 2024',
    },
    {
      image: { EventImage },
      title: 'Film Festival',
      organizer: 'Cinema',
      date: 'May 21, 2024',
    },
  ];

  const eventsPast = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Sports Weekend',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Music Festival',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Film Festival',
      organizer: 'Cinema',
      date: 'May 21, 2024',
    },
    {
      image: { EventImage },
      title: 'Jazz Festival',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'F1 ',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
  ];

  const [displayedEvent, setDisplayedEvents] = useState(true);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState('');
  const [filteredOrgData, setFilteredOrgData] = useState('');

  const ItemView = ({ item }) => {
    return (
      <EventBanner
        image={EventImage}
        title={item.title}
        organizer={item.organizer}
        date={item.date}
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const orgSearch = masterData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredOrgData(orgSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const orgSearch = previousData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredOrgData(orgSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
      displayedEvent
        ? setFilteredData(masterData)
        : setFilteredData(previousData);
      setSearch(text);
    }
  };

  const toggleDisplay = (e) => {
    setDisplayedEvents({ displayedEvent: !displayedEvent });
  };

  var dE;
  var tabs;
  var showEvents;
  if (displayedEvent) {
    tabs = (
      <>
        <TouchableOpacity
          title='Show Form 1'
          onPress={() => setDisplayedEvents(true)}
          style={styles.upcoming}
        >
          <Text>upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title='Show Form 2'
          onPress={() => setDisplayedEvents(false)}
          style={styles.previous}
        >
          <Text>previous</Text>
        </TouchableOpacity>
      </>
    );
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : events}
          renderItem={ItemView}
        ></FlatList>
        <FlatList
          data={filteredOrgData ? filteredOrgData : []}
          renderItem={ItemView}
        ></FlatList>
      </>
    );
  } else {
    tabs = (
      <>
        <TouchableOpacity
          title='Show Form 1'
          onPress={() => setDisplayedEvents(true)}
          style={styles.previous}
        >
          <Text>upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title='Show Form 2'
          onPress={() => setDisplayedEvents(false)}
          style={styles.upcoming}
        >
          <Text>previous</Text>
        </TouchableOpacity>
      </>
    );
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : eventsPast}
          renderItem={ItemView}
        ></FlatList>
        <FlatList
          data={filteredOrgData ? filteredOrgData : []}
          renderItem={ItemView}
        ></FlatList>
      </>
    );
  }
  // for past and upcoming events use useStates and a conditional mapping
  return (
    <SafeAreaView>
      <ScrollView>
        <Screen style={{ padding: 20, backgroundColor: '#F5F5F5' }}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={{ color: colors.darkGrey }}>
                Today's <Text style={styles.paragraph}>{date}</Text>{' '}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 28 }}>
                Welcome, {user.name}!
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                borderRadius: 250,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
              }}
            >
              <Ionicons name='notifications' size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <SearchBar
              style={{ width: '85%' }}
              placeholder='Search for...'
              onChangeText={(text) => {
                searchFilter(text);
              }}
            />
            <TouchableOpacity style={styles.filter}>
              <Ionicons name='ios-filter' size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.eventTabs}>{tabs}</View>

          <Text style={styles.eventTitle}>Your Events</Text>

          {showEvents}
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: 'flex-start',
    width: '50%',
  },
  organizertwo: {
    alignItems: 'flex-end',
    width: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  filter: {
    justifyContent: 'center',
  },
  eventTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  upcoming: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  previous: {
    borderBottomWidth: 2,
    borderBottomColor: colors.darkGrey,
  },
});

export default OrganizerDashboardScreen;
