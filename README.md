# react-native-swipeflow

`react-native-swipeflow` is a customizable swipeable card component for React Native, allowing users to swipe through items in various directions (left, right, top). It can be easily integrated into your app to create interactive swipe gestures.

## Installation

To install `react-native-swipeflow`,
you can use npm or yarn:
```
npm install react-native-swipeflow
```
# or
```
yarn add react-native-swipeflow
```
![SwipeFlow Demo](https://raw.githubusercontent.com/mohdjalalmk/SwipeFlow/main/gif/swipe.gif) ![SwipeFlow Demo](https://raw.githubusercontent.com/mohdjalalmk/SwipeFlow/main/gif/example.gif)

## Usage

First, import `SwipeCard` into your React Native component:

```javascript
import { SwipeCard } from 'react-native-swipeflow';

```

## Example
```
const data = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
];

<SwipeCard
  data={data} // Array of items you want to display in swipeable cards
  onSwipeLeft={(item) => console.log('Swiped Left:', item)} // Handle left swipe
  onSwipeRight={(item) => console.log('Swiped Right:', item)} // Handle right swipe
  onSwipeTop={(item) => console.log('Swiped Top:', item)} // Handle top swipe
  renderCard={(item) => (
    <View>
      <Text>{item.name}</Text> // Render each item in a card
    </View>
  )}
  renderEmptyCardView={() => (
    <View>
      <Text>No more cards</Text>
    </View>
  )}
/>

```

### Props

| Prop                     | Type              | Description                                                  |
|--------------------------|-------------------|--------------------------------------------------------------|
| `data`                   | `Array`           | The list of items to display in swipeable cards.              |
| `onSwipeLeft`             | `Function`        | Callback function when an item is swiped left.                |
| `onSwipeRight`            | `Function`        | Callback function when an item is swiped right.               |
| `onSwipeTop`              | `Function`        | Callback function when an item is swiped up.                 |
| `renderCard`              | `Function`        | A function that returns JSX for rendering a card.             |
| `renderEmptyCardView`     | `Function (optional)` | A function to render a custom view when no more cards are available. |

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mohdjalalmk/SwipeFlow/blob/main/LICENSE) file for details.