import { firestore } from './firebase';


class WorkoutApi {
    static collectionRef = firestore.collection("workouts");

    static connect_workouts(setData, setLoading) {
        return this.collectionRef.orderBy("date", "desc").onSnapshot(querySnapshot => {
            let result = querySnapshot.docs.map(doc => {
                let workout = doc.data();
                let winnerId = null;
                for (let [user, performance] of Object.entries(workout.performances)) {
                    performance.win = false;
                    if (!winnerId || performance.value > workout.performances[winnerId].value) {
                        winnerId = user;
                    }
                }
                workout.performances[winnerId].win = true;
                return workout;
            });
            setData(result);
            setLoading(false);
        });
    }

    static put_workout(workout) {
        workout = Object.assign({}, workout);
        let workoutRef = null;
        if (workout.id) {
            workoutRef = this.collectionRef.doc(workout.id);
            delete workout.id;
        } else {
            workoutRef = this.collectionRef.doc();
        }
        return workoutRef.set(workout);
    }
}

export default WorkoutApi;