import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface SwipeCardProps<T> {
  data: T[];
  onSwipeLeft: (item: T) => void;
  onSwipeRight: (item: T) => void;
  onSwipeTop: (item: T) => void;
  renderCard: (item: T) => React.ReactNode;
  renderEmptyCardView?: () => React.ReactNode;
}

export const SwipeCard = <T extends object>({
  data,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  renderCard,
  renderEmptyCardView,
}: SwipeCardProps<T>) => {
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
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          forceSwipe("top");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: "right" | "left" | "top") => {
    let x = 0,
      y = 0;

    switch (direction) {
      case "right":
        x = SCREEN_WIDTH;
        break;
      case "left":
        x = -SCREEN_WIDTH;
        break;
      case "top":
        y = -SCREEN_HEIGHT;
        break;
    }

    Animated.timing(position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: "right" | "left" | "top") => {
    const item = data[index];
    switch (direction) {
      case "right":
        onSwipeRight(item);
        break;
      case "left":
        onSwipeLeft(item);
        break;
      case "top":
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
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return renderEmptyCardView ? (
        renderEmptyCardView()
      ) : (
        <View style={styles.emptyCardContainer}>
          <Text>No more cards</Text>
        </View>
      );
    }

    const currentCard = (
      <Animated.View
        key={index}
        {...panResponder.panHandlers}
        style={[getCardStyle(), styles.card]}
      >
        {renderCard(data[index])}
      </Animated.View>
    );

    const upcomingCard =
      index + 1 < data.length ? (
        <View style={[styles.card, { top: 20 }]}>
          {renderCard(data[index + 1])}
        </View>
      ) : null;

    return [upcomingCard, currentCard];
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: SCREEN_WIDTH,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  emptyCardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
});
