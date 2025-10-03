export interface IBook {
  id?: number;
  titol: string;
  autor: string;
  anyPublicacio?: number;
  editorial: string;
  pagines: number;
  isbn?: string;
  userPropietari?: string;
}

export interface IUser {
  id?: string;
  nom: string;
  email: string;
  avatar: string;
  geolocalitzacio?: ILocalitzacio;
  pushToken?: string;
}

export interface ILocalitzacio {
  lat: number;
  lng: number;
}