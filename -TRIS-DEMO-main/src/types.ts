export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Vehicle {
  name: string;
  model: string;
  basePrice: number;
  image: string;
}

export interface Experience {
  name: string;
  description: string;
  fee: number;
  image: string;
}

export interface Journey {
  startDate: string;
  endDate: string;
  days: number;
  nights: number;
  vehicle: Vehicle;
  adults: number;
  kids: number;
  experience: Experience;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cash';
  step: number;
}
