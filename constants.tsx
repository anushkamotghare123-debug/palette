
import { Artwork, User, Review } from './types';

export const CATEGORIES = [
  'Oil Painting', 'Digital Art', 'Sculpture', 'Photography', 'Watercolor', 'Sketch'
];

export const MEDIUMS = [
  'Canvas', 'Digital', 'Bronze', 'Paper', 'Wood', 'Metal'
];

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artistId: 'a1',
    artistName: 'Elena Vance',
    description: 'A vibrant exploration of urban decay meets cyberpunk aesthetics. The piece uses high-contrast light to emphasize the isolation of modern city life.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    category: 'Digital Art',
    medium: 'Digital',
    dimensions: '4000x3000px',
    tags: ['Neon', 'City', 'Modern'],
    status: 'AVAILABLE'
  },
  {
    id: '2',
    title: 'Silent Peaks',
    artistId: 'a2',
    artistName: 'Marcus Thorne',
    description: 'Breathtaking mountain vistas captured during the golden hour in the Swiss Alps.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    category: 'Photography',
    medium: 'Paper',
    dimensions: '24x36 inches',
    tags: ['Nature', 'Landscape', 'Mountains'],
    status: 'AVAILABLE'
  },
  {
    id: '3',
    title: 'Fractured Reality',
    artistId: 'a1',
    artistName: 'Elena Vance',
    description: 'A study in perspective and shattered glass textures using traditional oil techniques.',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    category: 'Oil Painting',
    medium: 'Canvas',
    dimensions: '18x24 inches',
    tags: ['Abstract', 'Blue', 'Geometric'],
    status: 'AVAILABLE'
  },
  {
    id: '4',
    title: 'Ephemeral Echo',
    artistId: 'a3',
    artistName: 'Sarah Jenkins',
    description: 'Soft watercolor strokes depicting the transition of seasons in a rural garden.',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    category: 'Watercolor',
    medium: 'Paper',
    dimensions: '12x12 inches',
    tags: ['Nature', 'Soft', 'Floral'],
    status: 'SOLD'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'b1',
    name: 'John Collector',
    email: 'john@example.com',
    role: 'BUYER',
    avatar: 'https://i.pravatar.cc/150?u=b1'
  },
  {
    id: 'a1',
    name: 'Elena Vance',
    email: 'elena@art.com',
    role: 'ARTIST',
    isVerified: true,
    bio: 'Digital nomad exploring the intersection of light and technology.',
    avatar: 'https://i.pravatar.cc/150?u=a1'
  },
  {
    id: 'admin1',
    name: 'System Admin',
    email: 'admin@palette.com',
    role: 'ADMIN',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    artworkId: '4',
    userId: 'b1',
    userName: 'John Collector',
    rating: 5,
    comment: 'The colors are even more vibrant in person. Truly a masterpiece!',
    date: '2023-10-15'
  }
];
