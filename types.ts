
export type UserRole = 'ARTIST' | 'BUYER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  medium: string;
  dimensions: string;
  tags: string[];
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';
}

export interface Review {
  id: string;
  artworkId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Commission {
  id: string;
  buyerId: string;
  buyerName: string;
  artistId: string;
  title: string;
  requirements: string;
  budget: number;
  deadline: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface Order {
  id: string;
  artworkId: string;
  artworkTitle: string;
  buyerId: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  trackingNumber?: string;
  date: string;
}
