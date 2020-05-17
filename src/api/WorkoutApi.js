import { firestore } from './firebase';


class WorkoutApi {
    static collectionRef = firestore.collection("workouts");

    static connect_workouts(setData, setLoading) {
        return this.collectionRef.orderBy("date", "desc").onSnapshot(querySnapshot => {
            let result = querySnapshot.docs.map(doc => {
                let workout = doc.data();
                let winnerId = [];

                for (let [user, performance] of Object.entries(workout.performances)) {
                    performance.win = false;
                    if (winnerId.length === 0 || performance.value === workout.performances[winnerId[0]].value) {
                        winnerId.push(user);
                    } else if (performance.value > workout.performances[winnerId[0]].value) {
                        winnerId = [user];
                    }
                }
                winnerId.forEach(winner => {
                    workout.performances[winner].win = true;
                })
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