import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonAvatar, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/interfaces';
import { AvatarService } from 'src/app/services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonInput, IonAvatar, IonLabel, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, ReactiveFormsModule]
})
export class ProfilePage {

  router = inject(Router);
  userService = inject(UserService);
  auth = inject(Auth);
  avatarService = inject(AvatarService);

  profileForm!: FormGroup;
  user!: IUser;

  constructor(private loadingController: LoadingController, private alertController: AlertController) {
    console.log('ProfilePage constructor', this.profileForm);
  }

  ionViewDidEnter() {
    console.log('ProfilePage IonViewDidEnter');
    this.getUserInfo();
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  getUserInfo(): void {
    this.userService.getUserById(this.auth.currentUser?.uid!).subscribe(user => {
      console.log('User retrieved: ', user);
      this.user = user!;
      this.createProfileForm();
    });
 }

  createProfileForm(): void {
    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      nom: new FormControl(this.user.nom || ''),
      cognoms: new FormControl(this.user.cognoms || ''),
      geolocalitzacio: new FormControl(this.user.geolocalitzacio || '')
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedUser: IUser = {
        ...this.user,
        ...this.profileForm.value
      };
      this.userService.updateUser(updatedUser).then(() => {
        console.log('User updated successfully');
      });
    } else {
      console.log('Form is invalid');
    } 
  }

	async changeImage() {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64
    });

		if (image) {
			const loading = await this.loadingController.create();
			await loading.present();

			const result = await this.avatarService.uploadImage(image);
			loading.dismiss();

			if (!result) {
				const alert = await this.alertController.create({
					header: 'Upload failed',
					message: 'There was a problem uploading your avatar.',
					buttons: ['OK']
				});
				await alert.present();
			} else {
        this.user.avatar = result;
      }
		}
	}
}
