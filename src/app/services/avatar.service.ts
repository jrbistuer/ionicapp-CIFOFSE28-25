import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  constructor() {}

	getUserProfile() {
		const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, `users/${user!.uid}`);
		return docData(userDocRef, { idField: 'id' });
	}

	async uploadImage(cameraFile: Photo) {
		const user = this.auth.currentUser;
		const path = `uploads/${user!.uid}/profile.webp`;
		const storageRef = ref(this.storage, path);

		try {
			await uploadString(storageRef, cameraFile.base64String!, 'base64');

			const imageUrl = await getDownloadURL(storageRef);

			//const userDocRef = doc(this.firestore, `users/${user!.uid}`);
			//await setDoc(userDocRef, {
			//	imageUrl
			//});
			return imageUrl;
		} catch (e) {
			return null;
		}
	}

}