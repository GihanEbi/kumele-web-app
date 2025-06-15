// lib/mockData.ts

export interface Event {
  id: string;
  category: string;
  imageSrc: string;
  title: string;
  guests: number;
  price: string;
  time: string;
}

export const mockEventData = {
  category: "Spirituality",
  imageSrc: "/bg-imgs/preview-event.jpg",
  title: "Group meditation",
  price: "Free",
  time: "7:45-9:30",
  guests: 12,
  startsIn: "Starts in 7 hrs",
  location: "22414 Indore",
  subtitle: "🌟 Invitation to a Transformative Yoga Experience: Kundalini Awakening Gathering",
  description: "Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakeninwith our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This Embark on a profound journey of self-discovery and inner transformation with our exclusive Kundalini Awakening Yoga event! We invite you to join us for a harmonious gathering where ten individuals will come together to explore the ancient practice of Kundalini yoga. This",
};

export const mockHostData = {
  name: "Alkesh",
  avatarSrc: "/avatar-img/commentor3.png",
  followers: 50,
  rating: 4.5,
  level: "Gold",
  levelIcon: "23",
  aboutTitle: "Engineering Marvel with a Passion for Beats and Serenity",
  aboutBio: "Welcome to my world of innovation and rhythm! I'm Alkesh, an engineer by profession and a connoisseur of life's eclectic experiences.",
};

export const mockOtherEvents: Event[] = [
  {
    id: "1",
    category: "House Party",
    imageSrc: "/bg-imgs/event1.jpg",
    title: "90's Hip-Hop",
    guests: 12,
    price: "Free",
    time: "7:45-9:30",
  },
  {
    id: "2",
    category: "House Party",
    imageSrc: "/bg-imgs/event2.jpg",
    title: "Holi with kids",
    guests: 12,
    price: "Free",
    time: "7:45-9:30",
  },
  {
    id: "1",
    category: "House Party",
    imageSrc: "/bg-imgs/event3.jpg",
    title: "90's Hip-Hop",
    guests: 12,
    price: "Free",
    time: "7:45-9:30",
  },
  {
    id: "1",
    category: "House Party",
    imageSrc: "/bg-imgs/event4.jpg",
    title: "90's Hip-Hop",
    guests: 12,
    price: "Free",
    time: "7:45-9:30",
  },
];