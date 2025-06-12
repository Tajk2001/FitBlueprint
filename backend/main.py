"""FastAPI application for FitBlueprint."""

from typing import List, Dict, Any
from fastapi import FastAPI
from pydantic import BaseModel

from . import evaluation

app = FastAPI(title="FitBlueprint API")

# Request schemas ------------------------------------------------------------

class EvalRequest(BaseModel):
    age: int
    sex: str
    weight_kg: float
    chair_stand: int
    push_up: int
    step_hr: int
    walk_time_min: float
    walk_hr: int


class PlanRequest(BaseModel):
    categories: List[str]


# Endpoints ------------------------------------------------------------------

@app.post("/evaluate")
def evaluate(req: EvalRequest) -> Dict[str, Any]:
    """Evaluate all fitness tests and provide a weekly plan."""
    data = req.dict()
    test_results = evaluation.evaluate_all_tests(data)
    categories = [result["Score Category"] for result in test_results]
    weekly_plan = evaluation.generate_weekly_plan(categories)
    tests_dict = {res["Test Name"]: res for res in test_results}
    return {"tests": tests_dict, "weekly_plan": weekly_plan}


@app.post("/plan")
def plan(req: PlanRequest) -> Dict[str, str]:
    """Return a weekly training plan."""
    return evaluation.generate_weekly_plan(req.categories)


