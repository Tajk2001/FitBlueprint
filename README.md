# 🧠 FitBlueprint

FitBlueprint is a personalized fitness and health app that helps users assess their metabolic and physical fitness using at-home movement tests. It compares results against science-backed norms by age and sex, flags risk areas, and generates a weekly plan to improve health and performance.

---

## 🚀 Features

- ✅ At-home fitness test analysis (cardio & strength)
- 🧪 Science-based scoring and risk flagging
- 📊 Personalized weekly training plan generator
- 📱 Mobile-first React Native frontend
- ⚙️ FastAPI backend with clean API endpoints

---

## 📁 Project Structure

```
fitblueprint/
├── app/             # React Native frontend (onboarding, test inputs, dashboard)
├── backend/         # FastAPI backend (main.py, evaluation logic)
├── .env             # Environment variables
├── setup.sh         # Project setup script
├── README.md        # You're here
```

---

## 🏃‍♂️ Example Usage

### Evaluation

```bash
POST /evaluate
{
  "age": 45,
  "sex": "male",
  "weight_kg": 80,
  "chair_stand": 15,
  "push_up": 18,
  "step_hr": 125,
  "walk_time_min": 16.2,
  "walk_hr": 140
}
```

Example response:

```json
{
  "tests": {
    "Chair Stand Test": {
      "Test Name": "Chair Stand Test",
      "Score Category": "Good",
      "Risk Flag": false,
      "Message": "Great lower-body strength!"
    },
    "Push-Up Test": {
      "Test Name": "Push-Up Test",
      "Score Category": "Fair",
      "Risk Flag": true,
      "Message": "Your upper-body endurance is below average."
    },
    "6-Min Step Test": {
      "Test Name": "6-Min Step Test",
      "Score Category": "Fair",
      "Risk Flag": true,
      "Message": "Elevated recovery heart rate; focus on aerobic conditioning."
    },
    "1-Mile Walk Test": {
      "Test Name": "1-Mile Walk Test",
      "Score Category": "Good",
      "Risk Flag": false,
      "Message": "Excellent aerobic capacity!",
      "VO2max": 42.1
    }
  },
  "weekly_plan": {
    "Monday": "30-min easy walk + mobility",
    "Tuesday": "Rest or gentle yoga",
    "Wednesday": "Bodyweight circuit x1 (squats, push-ups, rows)",
    "Thursday": "Rest",
    "Friday": "30-min easy walk",
    "Saturday": "Light recreational activity",
    "Sunday": "Rest and stretch"
  }
}
```

---

### Weekly Plan

```bash
POST /plan
{
  "categories": ["Good", "Fair", "Fair", "Good"]
}
```

Example response:

```json
{
  "Monday": "30-min easy walk + mobility",
  "Tuesday": "Rest or gentle yoga",
  "Wednesday": "Bodyweight circuit x1 (squats, push-ups, rows)",
  "Thursday": "Rest",
  "Friday": "30-min easy walk",
  "Saturday": "Light recreational activity",
  "Sunday": "Rest and stretch"
}
```

---

## 📱 Running the Mobile App

The React Native frontend is located in `app/`. To start it with Expo:

```bash
cd app
npm install
npx expo start
```

Make sure the FastAPI backend is running at:

```
http://localhost:8000
```
