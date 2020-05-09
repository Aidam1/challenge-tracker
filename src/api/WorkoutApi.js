import { firestore } from './firebase';


class WorkoutApi {
    static get_workouts() {
        return firestore.collection("workouts").get();
    }

    static get_performances(workout_id) {
        return firestore.collection("workouts").doc(workout_id).collection("user_workout").get();
    }
}

export default WorkoutApi;