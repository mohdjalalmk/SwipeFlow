import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export interface CardData {
  name: string;
  image: any; // Replace `any` with ImageSourcePropType if you're using TypeScript
}

export interface SwipeCardProps {
  data: CardData[];
  onSwipeLeft: (item: CardData) => void;
  onSwipeRight: (item: CardData) => void;
  onSwipeTop: (item: CardData) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  data,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
}) => {
  const [position] = useState(new Animated.ValueXY());
  const [index, setIndex] = useState(0);
  const nextCardIndex = useRef(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gesture: PanResponderGestureState
      ) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (
        event: GestureResponderEvent,
        gesture: PanResponderGestureState
      ) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          forceSwipe('top');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left' | 'top') => {
    let x = 0,
      y = 0;

    switch (direction) {
      case 'right':
        x = SCREEN_WIDTH;
        break;
      case 'left':
        x = -SCREEN_WIDTH;
        break;
      case 'top':
        y = -SCREEN_HEIGHT;
        break;
    }

    Animated.timing(position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left' | 'top') => {
    const item = data[index];
    switch (direction) {
      case 'right':
        onSwipeRight(item);
        break;
      case 'left':
        onSwipeLeft(item);
        break;
      case 'top':
        onSwipeTop(item);
        break;
    }
    position.setValue({ x: 0, y: 0 });
    setIndex(nextCardIndex.current++);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return <Text>No more cards</Text>;
    }

    const currentCard = (
      <Animated.View
        key={index}
        {...panResponder.panHandlers}
        style={[getCardStyle(), styles.card]}
      >
        <Image
          source={data[index].image}
          style={{ height: 400, width: '90%', borderRadius: 20 }}
          resizeMode="cover"
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data[index].name}</Text>
        </View>
      </Animated.View>
    );

    const upcomingCard =
      index + 1 < data.length ? (
        <View style={[styles.card, { top: 20 }]}>
          <Image
            source={data[index + 1].image}
            style={{ height: 400, width: '90%', borderRadius: 20 }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{data[index + 1].name}</Text>
          </View>
        </View>
      ) : null;

    return [upcomingCard, currentCard];
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  nameContainer: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(136, 10, 10, 0.3)',
    padding: 5,
    borderRadius: 5,
  },
});

