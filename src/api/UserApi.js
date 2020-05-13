import { firestore } from './firebase';


class UserApi {
    static collectionRef = firestore.collection("users");

    static get_users() {
        return this.collectionRef.orderBy("name", "asc").get();
    }

    static put_user(user) {
        user = Object.assign({}, user);
        let userRef = null;
        if (user.id) {
            userRef = this.collectionRef.doc(user.id);
            delete user.id;
        } else {
            userRef = this.collectionRef.doc();
        }
        return userRef.set(user);
    }
}

export default UserApi;