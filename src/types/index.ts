// types/index.ts
// Ortak TypeScript Tip Tanımlamaları — Menü öğesi, Rezervasyon talebi ve Restoran parametre tiplerini içerir.

export type MenuItem = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  description: string;
  descriptionEn: string;
  allergens: string[];
  image: string;
  active: boolean;
};

export type Reservation = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
};

export type WorkingHours = {
  day: string;
  open: string;
  close: string;
};

export type RestaurantDetails = {
  name: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  addressEn: string;
  mapsLink: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  workingHours: WorkingHours[];
};
