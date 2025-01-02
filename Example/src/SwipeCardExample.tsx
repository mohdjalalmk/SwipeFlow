import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {SwipeCard} from '../../src/SwipeFlow';

const movieData = [
  {
    title: 'The Dark Knight',
    year: 2008,
    image: require('../Assets/movies/darkknight.jpg'),
  },
  {
    title: 'Inception',
    year: 2010,
    image: require('../Assets/movies/inception.jpg'),
  },
  {
    title: 'Interstellar',
    year: 2014,
    image: require('../Assets/movies/interstellar.jpg'),
  },
  {
    title: 'Parasite',
    year: 2019,
    image: require('../Assets/movies/parasite.jpg'),
  },
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    image: require('../Assets/movies/shawshankredemption.jpg'),
  },
  {
    title: 'The Godfather',
    year: 1972,
    image: require('../Assets/movies/godfather.jpg'),
  },
  {
    title: 'The Matrix',
    year: 1999,
    image: require('../Assets/movies/matrix.jpg'),
  },
  {
    title: 'Gladiator',
    year: 2000,
    image: require('../Assets/movies/gladiator.jpg'),
  },
  {
    title: 'Forrest Gump',
    year: 1994,
    image: require('../Assets/movies/forrestgump.webp'),
  },
  {
    title: 'Pulp Fiction',
    year: 1994,
    image: require('../Assets/movies/pulpfiction.jpg'),
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    image: require('../Assets/movies/darkknight.jpg'),
  },
  {
    title: 'Inception',
    year: 2010,
    image: require('../Assets/movies/inception.jpg'),
  },
  {
    title: 'Interstellar',
    year: 2014,
    image: require('../Assets/movies/interstellar.jpg'),
  },
  {
    title: 'Parasite',
    year: 2019,
    image: require('../Assets/movies/parasite.jpg'),
  },
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    image: require('../Assets/movies/shawshankredemption.jpg'),
  },
  {
    title: 'The Godfather',
    year: 1972,
    image: require('../Assets/movies/godfather.jpg'),
  },
  {
    title: 'The Matrix',
    year: 1999,
    image: require('../Assets/movies/matrix.jpg'),
  },
];

const SwipeCardExample = () => {
  const handleSwipeLeft = (item: (typeof movieData)[0]) => {
    // Alert.alert("Swiped Left", `You rejected ${item.title}`);
  };

  const handleSwipeRight = (item: (typeof movieData)[0]) => {
    // Alert.alert("Swiped Right", `You liked ${item.title}`);
  };

  const handleSwipeTop = (item: (typeof movieData)[0]) => {
    // Alert.alert("Swiped Up", `You favorited ${item.title}`);
  };

  const renderCard = (item: (typeof movieData)[0]) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.poster} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.year}>{item.year}</Text>
      </View>
    );
  };

  const renderEmptyCardView = () => (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyText}>No more movies to show!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={styles.movietext}>
        <Text style={styles.header}>Swipe Your Favorite Movies</Text>
      </View>

      <Image
        source={require('../Assets/movies/grid.webp')}
        style={styles.backgroundImage}
      />
      <SwipeCard
        data={movieData}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onSwipeTop={handleSwipeTop}
        renderCard={renderCard}
        renderEmptyCardView={renderEmptyCardView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'repeat',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '150%',
    opacity: 0.6,
    zIndex: -1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 280,
    height: 420,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  year: {
    fontSize: 18,
    color: '#888',
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 20,
    color: '#777',
    fontWeight: 'bold',
  },
  movietext:{
    padding: 5,
    backgroundColor: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    borderRadius: 20,
  }
});

export default SwipeCardExample;
