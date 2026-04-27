# Running the AI Reflection Tool Prototype

## System Requirements

- [Miniconda or Anaconda](https://docs.conda.io/en/latest/miniconda.html)
- An iOS or Android device with **Expo Go** installed, OR a simulator/emulator

## First-time Setup (run once)

```bash
bash setup.sh
```

This creates a new conda environment called `si840-expo` with Node.js 24 and installs all npm dependencies.

If you prefer to set up manually:

```bash
conda create -n si840-expo nodejs=24 -y
conda activate si840-expo
cd ai-reflection-tool
npm install
npx expo install react-dom react-native-web
```

## Running the App on a Phone (Expo Go)

```bash
conda activate si840-expo
cd ai-reflection-tool
npx expo start
```

- **iOS**: Open the Camera app and scan the QR code shown in the terminal.
- **Android**: Open the Expo Go app, tap "Scan QR code", and scan.

## Running in a Web Browser (quick preview)

```bash
conda activate si840-expo
cd ai-reflection-tool
npx expo start --web
```

Opens at `http://localhost:8081`. The layout is designed for mobile width (~390px).
Resize your browser window to a narrow portrait size for the best preview.

### Accessing the web preview from a remote server

If you are running the app on a remote Linux server (e.g., a university HPC node),
`localhost:8081` is not directly reachable from your local browser. Use SSH port
forwarding to tunnel the connection.

**From your local machine**, open a terminal and run:

```bash
ssh -L 8081:localhost:8081 <your-username>@<server-hostname>
```

For example:

```bash
ssh -L 8081:localhost:8081 wangj306@illidan-gpu-12.eecs.umich.edu
```

Then open `http://localhost:8081` in your local browser.

If port 8081 is already in use on your local machine, pick a different local port:

```bash
ssh -L 9000:localhost:8081 wangj306@illidan-gpu-12.eecs.umich.edu
```

Then open `http://localhost:9000` instead.

## Taking Screenshots for the HCI Paper

1. Start the app with `npx expo start`
2. Open on a real phone or iOS/Android simulator
3. Walk through the 7-screen flow:
   - Screen 1: Welcome & Privacy Notice
   - Screen 2: Select Research Task
   - Screen 3: Select AI Contribution
   - Screen 4: Reflection Questions (Yes/Maybe/No)
   - Screen 5: Reflection Result (category + summary)
   - Screen 6: Disclosure Draft (optional)
   - Screen 7: Saved Reflections / History
4. Use your phone's screenshot button or the simulator screenshot tool

## App Structure

```
src/
├── theme/index.js          — colors, typography, spacing
├── utils/reflectionLogic.js — scoring + text generation (pure function)
├── utils/storage.js         — AsyncStorage read/write/delete
├── components/
│   ├── ProgressBar.js       — "Step N of 6" indicator
│   ├── OptionButton.js      — selectable pill
│   └── YesNoMaybe.js        — 3-way toggle row
└── screens/
    ├── WelcomeScreen.js
    ├── TaskSelectScreen.js
    ├── AIContributionScreen.js
    ├── ReflectionScreen.js
    ├── ResultScreen.js
    ├── DisclosureScreen.js
    └── HistoryScreen.js
```

## Privacy

- All reflection data is stored only in the device's local AsyncStorage.
- No network requests are made at any point.
- No login or account is required.
- Users are reminded not to enter sensitive or unpublished research content.

## Reflection Category Logic

The app scores answers to 6 yes/no/maybe questions (yes=2, maybe=1, no=0).
Question 5 ("Would you feel comfortable explaining this AI use?") is inverted —
answering "no" increases the concern score.

| Total score | Category       |
|-------------|---------------|
| 0 – 3       | Low Concern   |
| 4 – 7       | Medium Concern|
| 8 – 12      | High Concern  |

All categories are labeled "Reflective guidance — not a rule or judgment."
