import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { IUser } from '../models/interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
	private userService: UserService = inject(UserService);

	constructor() { }

	async register({ email, password }: { email: string; password: string }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);

			const myUser: IUser = {
				nom: '',
				email: user.user.email || '',
				avatar: ''
			};

			await this.userService.saveUser(myUser);

			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }: { email: string; password: string }) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}
}
