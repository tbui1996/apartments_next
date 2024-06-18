export interface Apartment {
    uuid: string;
    title: string;
    previewImage: string;
    description: string;
    area: number;
    roomsNo: number;
    monthlyPrice: number;
    isAvailable: boolean;
    createdAt: Date;
    realtorUuid: string;
    coordinatesLat: string;
    coordinatesLng: string;
  }
  