# Guess A Number App
 - First React-Native app I created with Expo following the course `React Native - The Practical Guide [2021 Edition]` on Udemy by Maximilian Schwarzmüller.
 - The course was done step by step, with opportunities to pause and tinker with styles and custom components on your own.
 - First step was to build all of the required components, then I commented the code to make sure I understood what I wrote
 - Second step was to add more support for smaller screens using the `Dimensions` API
 - Third step was to add orientation support with config files and managing `Dimensions` with state where applicable
 - The last step was to add the `Platform` API to have differences in both Android and IOS. Also added platform specific components using the `component.platform.js notation` (Example: `MainButton.ios.js` or `MainButton.android.js`)

# How To Play
- Select a number between 1-100
- Confirm your selection
- The computer will try to guess your number, tell it to go either higher or lower
- Repeat until the computer guesses your number
- The end screen will tell you how many guesses the computer needed, and give you an option to start a new game
