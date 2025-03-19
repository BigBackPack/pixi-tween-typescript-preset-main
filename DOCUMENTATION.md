# SLOT GAME PROTOTYPE

## 👀 Basic Description:
This prototype shows a very basic version of animated reels on a 5x3 grid layout.
This is not a functional game by any means and does not contain any win or lose conditions.

## 🧠 Functionality Reels: 
- By triggering the Spin Button (by click) a new spin starts.
- Every spin starts with the animation of all five reels at once.
- All reels slowly ease in and abruptly stop.
- The reels stop one after another from left to right.
- The spin duration for the first reel is 2.0 sec.
- Each reel's animation duration is staggered by 0.2 seconds.
- The total length of the spin animation (all reels included) is 2.8 sec.
- Each spinning reel ends its animation with a bounce effect.

## 🚀 Functionality Spin Button: 
- The Spin button is located in the bottom right corner of the display.
- The Spin button has two states: Active, Inactive.
- By clicking the Spin Button, a new Spin can be started (if the Spin Button is in an active state).
- The Spin button remains in an inactive state as long as the reels are moving.

## 🙃 Challenges and Solutions:
### Creating "Realistic" Spinning Behaviour:
I wanted to make sure the reels don't just spin randomly but actually behave in a similar fashion to real slot spins, including:
- **Ease-in effect on animation start:** Solved by using GSAP's built-in "power2.in" easing pattern inside the `spinStart()` function.
- **An abrupt stop on animation end:** Solved using the same "power2.in" easing pattern.
- **A bounce effect at the end of the animation:** Solved by using GSAP's "power2.inOut" easing pattern in a separate function named `reelBounce()` called within the `spinStart()` function.
- **The reels gradually stop in a staggered manner:** Solved by adding a delay of 0.2 sec to each additional reel after the first one in the `spinStart()` function.
- **A soft blur effect on the reels to increase the sensation of speed during each spin:** Solved by using GSAP to animate Pixi’s built-in blur filter attributes in the `spinStart()` function. The blur effect begins 1 second after the animation starts and gradually increases in intensity, giving the sensation of speed as the reels spin.
- **Grayscale effect on the Spin Button during the spin:** Solved by applying a grayscale filter to the Spin Button during the spin. This visually indicates that the Spin Button is inactive while the reels are spinning. The filter is applied using Pixi's `ColorMatrixFilter` to desaturate the button during the spin.

### Visual Layout:
- Making sure all symbols respect the same distance from each other, no matter the height differences: Solved by centering the anchor for all symbols in the `init()` function.
- Making sure all symbols are only visible within the reel frames: Solved by using a Pixi mask effect in the `createMask()` function and applying it within the `init()` function.
- Avoiding graphic issues and visual gaps between the symbols on individual reels: Solved by defining a gap value, which was added to the reel symbols and mask x values within the `init()` function.

### UX:
- **Grayscale effect on the Spin Button during the spin to comunicate to the player what state the buton is currently in:** Solved by applying a grayscale filter to the Spin Button during the spin. This visually indicates that the Spin Button is inactive while the reels are spinning. The filter is applied using Pixi's `ColorMatrixFilter` to desaturate the button during the spin.

## 🤖 Automated Test Case:
### **Test Description:**
This automated test ensures that the game functions as expected by simulating a user interaction where the Spin Button is clicked, triggering the spin animation of the reels. The test checks if the game reacts correctly to the spin button click and verifies that the game canvas is still present after the spin is triggered, confirming that the game hasn't crashed and the animation process has started.
### **Running the Test in Terminal:**
To run the test, follow these steps:

1. **Ensure you have Playwright installed** in your project. If not, you can install it by running the following command:
   ```bash
   npm install playwright

2. **Run the test** by executing the following command in your terminal: command:
   ```bash
   npm run e2e

## 🙄 Final Thoughts:
I really enjoyed working on this project, even though some of the concepts were new to me. The solutions I came up with are most likely very different and less efficient than the systems you have developed so far, and I would love to hear more about alternative ways of handling the reels' behavior. Creating the test case at the end was a completely new experience for me, and I am still not quite sure if I got it all right at this point, but I am very excited to hear your opinion and feedback.
