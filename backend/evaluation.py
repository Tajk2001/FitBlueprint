"""Evaluation logic for FitBlueprint.
"""

from typing import Dict, Any, List

# Helper functions -----------------------------------------------------------

def get_age_group(age: int) -> str:
    """Return age group key."""
    if age < 40:
        return "20-39"
    if age < 60:
        return "40-59"
    return "60+"


def categorize(value: float, thresholds: Dict[str, float]) -> str:
    """Return category based on descending thresholds."""
    if value >= thresholds["Excellent"]:
        return "Excellent"
    if value >= thresholds["Good"]:
        return "Good"
    if value >= thresholds["Fair"]:
        return "Fair"
    return "Poor"

# Normative data -------------------------------------------------------------
# These data are simplified examples drawn from ACSM, CDC, and published norms.
# In practice, you would use comprehensive tables for each age and sex.

CHAIR_STAND_NORMS = {
    "male": {
        "20-39": {"Excellent": 22, "Good": 18, "Fair": 14},
        "40-59": {"Excellent": 20, "Good": 16, "Fair": 12},
        "60+": {"Excellent": 18, "Good": 14, "Fair": 10},
    },
    "female": {
        "20-39": {"Excellent": 20, "Good": 16, "Fair": 12},
        "40-59": {"Excellent": 18, "Good": 14, "Fair": 10},
        "60+": {"Excellent": 16, "Good": 12, "Fair": 8},
    },
}

PUSH_UP_NORMS = {
    "male": {
        "20-39": {"Excellent": 40, "Good": 30, "Fair": 20},
        "40-59": {"Excellent": 30, "Good": 20, "Fair": 15},
        "60+": {"Excellent": 20, "Good": 15, "Fair": 10},
    },
    "female": {
        "20-39": {"Excellent": 35, "Good": 25, "Fair": 15},
        "40-59": {"Excellent": 25, "Good": 15, "Fair": 10},
        "60+": {"Excellent": 15, "Good": 10, "Fair": 5},
    },
}

# Heart rate after the step test; lower is better
STEP_HR_THRESHOLDS = {"Excellent": 90, "Good": 110, "Fair": 130}

VO2MAX_NORMS = {
    "male": {
        "20-39": {"Excellent": 60, "Good": 52, "Fair": 45},
        "40-59": {"Excellent": 55, "Good": 47, "Fair": 40},
        "60+": {"Excellent": 45, "Good": 38, "Fair": 31},
    },
    "female": {
        "20-39": {"Excellent": 50, "Good": 42, "Fair": 35},
        "40-59": {"Excellent": 45, "Good": 37, "Fair": 30},
        "60+": {"Excellent": 38, "Good": 32, "Fair": 24},
    },
}

# Evaluation functions -------------------------------------------------------

def evaluate_chair_stand(reps: int, age: int, sex: str) -> Dict[str, Any]:
    age_group = get_age_group(age)
    thresholds = CHAIR_STAND_NORMS[sex][age_group]
    category = categorize(reps, thresholds)
    risk = category in {"Fair", "Poor"}
    message = (
        "Your lower-body strength is below average." if risk else
        "Great lower-body strength!"
    )
    return {
        "Test Name": "Chair Stand Test",
        "Score Category": category,
        "Risk Flag": risk,
        "Message": message,
    }


def evaluate_push_up(reps: int, age: int, sex: str) -> Dict[str, Any]:
    age_group = get_age_group(age)
    thresholds = PUSH_UP_NORMS[sex][age_group]
    category = categorize(reps, thresholds)
    risk = category in {"Fair", "Poor"}
    message = (
        "Your upper-body endurance is below average." if risk else
        "Solid upper-body endurance!"
    )
    return {
        "Test Name": "Push-Up Test",
        "Score Category": category,
        "Risk Flag": risk,
        "Message": message,
    }


def evaluate_step_test(hr: int) -> Dict[str, Any]:
    category = categorize(-hr, {k: -v for k, v in STEP_HR_THRESHOLDS.items()})
    risk = category in {"Fair", "Poor"}
    message = (
        "Elevated recovery heart rate; focus on aerobic conditioning." if risk else
        "Good heart rate recovery!"
    )
    return {
        "Test Name": "6-Min Step Test",
        "Score Category": category,
        "Risk Flag": risk,
        "Message": message,
    }


def rockport_vo2max(time_min: float, hr: int, age: int, sex: str, weight_kg: float) -> float:
    weight_lb = weight_kg * 2.20462
    gender_flag = 1 if sex == "male" else 0
    vo2 = (
        132.853
        - 0.0769 * weight_lb
        - 0.3877 * age
        + 6.315 * gender_flag
        - 3.2649 * time_min
        - 0.1565 * hr
    )
    return vo2


def evaluate_walk_test(time_min: float, hr: int, age: int, sex: str, weight_kg: float) -> Dict[str, Any]:
    vo2 = rockport_vo2max(time_min, hr, age, sex, weight_kg)
    age_group = get_age_group(age)
    thresholds = VO2MAX_NORMS[sex][age_group]
    category = categorize(vo2, thresholds)
    risk = category in {"Fair", "Poor"}
    message = (
        "Aerobic capacity is below average." if risk else
        "Excellent aerobic capacity!"
    )
    return {
        "Test Name": "1-Mile Walk Test",
        "Score Category": category,
        "Risk Flag": risk,
        "Message": message,
        "VO2max": round(vo2, 1),
    }


def evaluate_all_tests(data: Dict[str, Any]) -> Dict[str, Any]:
    """Evaluate all fitness tests and return results plus a weekly plan."""
    age = data["age"]
    sex = data["sex"]
    weight_kg = data.get("weight_kg", 70)

    results = [
        evaluate_chair_stand(data["chair_stand"], age, sex),
        evaluate_push_up(data["push_up"], age, sex),
        evaluate_step_test(data["step_hr"]),
        evaluate_walk_test(
            data["walk_time_min"],
            data["walk_hr"],
            age,
            sex,
            weight_kg,
        ),
    ]

    tests_dict = {res["Test Name"]: res for res in results}
    categories = [res["Score Category"] for res in results]
    weekly_plan = generate_weekly_plan(categories)
    return {"tests": tests_dict, "weekly_plan": weekly_plan}


# Weekly plan generation -----------------------------------------------------

POOR_PLAN = {
    "Monday": "30-min easy walk + mobility",
    "Tuesday": "Rest or gentle yoga",
    "Wednesday": "Bodyweight circuit x1 (squats, push-ups, rows)",
    "Thursday": "Rest",
    "Friday": "30-min easy walk",
    "Saturday": "Light recreational activity",
    "Sunday": "Rest and stretch",
}

GOOD_PLAN = {
    "Monday": "Moderate run 20 min + strength 2x10",
    "Tuesday": "Light recovery walk 30 min",
    "Wednesday": "Strength training 30 min",
    "Thursday": "Rest or yoga",
    "Friday": "Interval training 20 min",
    "Saturday": "Strength training 30 min",
    "Sunday": "Rest",
}

EXCELLENT_PLAN = {
    "Monday": "Run 30 min with intervals",
    "Tuesday": "Strength training 45 min",
    "Wednesday": "Cross-training (bike/swim) 30 min",
    "Thursday": "Rest or yoga",
    "Friday": "High-intensity intervals 20 min",
    "Saturday": "Long run or hike 45+ min",
    "Sunday": "Active recovery",
}


def generate_weekly_plan(categories: List[str]) -> Dict[str, str]:
    """Generate a plan based on worst category."""
    order = ["Poor", "Fair", "Good", "Excellent"]
    worst = min(categories, key=lambda c: order.index(c))
    if worst in {"Poor", "Fair"}:
        return POOR_PLAN
    if worst == "Good":
        return GOOD_PLAN
    return EXCELLENT_PLAN
