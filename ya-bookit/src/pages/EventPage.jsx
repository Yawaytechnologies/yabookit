// src/pages/Events.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EventCarousel from "../components/events/EventCarousel";
import ExploreEvents from "../components/events/ExploreEvents";
import ArtistsRow from "../components/events/ArtistsRow";
import AllEventsGrid from "../components/events/AllEventsGrid";
// // (Your existing poster images)
// import Rahman from "../assets/events/ar-rahman.jpg";
// import Karan from "../assets/events/karan-aulja.jpg";
// import Divine from "../assets/events/divine.jpg";

// // Category icons (add your own files with these names or adjust paths)
// import Music from "../assets/event-cats/music.png";
// import Nightlife from "../assets/event-cats/nightlife.png";
// import Comedy from "../assets/event-cats/comedy.png";
// import Sports from "../assets/event-cats/sports.png";
// import Performances from "../assets/event-cats/performances.png";
// import FoodDrinks from "../assets/event-cats/food-drinks.png";
// import Screenings from "../assets/event-cats/screenings.png";
// import Fitness from "../assets/event-cats/fitness.png";
// import Conferences from "../assets/event-cats/conferences.png";

export default function Events() {
  const navigate = useNavigate();

  const EVENTS = [
    {
      id: "rahman",
      dateLabel: "Sat, 29 Nov, 7:00 PM",
      title: "A.R. Rahman",
      subtitle: "Harmony by the Ganga",
      venue: "Namo ghat, Varanasi",
      priceLabel: "₹4999 onwards",
      ctaText: "Book tickets",
      posterImg: "Ar.jpg",
      onBook: () => navigate("/events/rahman"),
      onBack: () => navigate(-1),
    },
    {
      id: "karan",
      dateLabel: "Sun, 23 Nov, 6:00 PM",
      title: "Karan Aujla",
      subtitle: "Central Cee",
      venue: "Loud Park, Kharghar, Mumbai",
      priceLabel: "₹8000 onwards",
      ctaText: "Book tickets",
      posterImg: "sid.jpg",
      onBook: () => navigate("/events/karan"),
      onBack: () => navigate(-1),
    },
    {
      id: "divine",
      dateLabel: "Fri, 05 Dec, 8:00 PM",
      title: "DIVINE",
      subtitle: "Live in concert",
      venue: "RG Arena, Bengaluru",
      priceLabel: "₹1499 onwards",
      ctaText: "Book tickets",
      posterImg: "ash.png",
      onBook: () => navigate("/events/divine"),
      onBack: () => navigate(-1),
    },
  ];

  const CATEGORIES = [
    { title: "Music",        slug: "music",        img: "music.jpeg" },
    { title: "Nightlife",    slug: "nightlife",    img: "nightlife.jpeg" },
    { title: "Comedy",       slug: "comedy",       img: "comedy.jpeg" },
    { title: "Sports",       slug: "sports",       img: "sports.jpeg" },
    { title: "Performances", slug: "performances", img: "performances.jpeg" },
    { title: "Food & Drinks",slug: "food-drinks",  img:  "fooddrinks.jpeg" },
    { title: "Screenings",   slug: "screenings",   img: "screenings.jpeg" },
    
  ];

  const ARTISTS = [
    {
      name: "Arivu",
      img: "https://images.unsplash.com/photo-1519340333755-5063ad6c6585?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Robb Bank$",
      img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Meba Ofilia",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ski Mask the Slump God",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "The Yellow Diary",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Karsh Kale",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <EventCarousel events={EVENTS} />
      <ExploreEvents
        categories={CATEGORIES}
        onSelect={(slug) => navigate(`/events/category/${slug}`)}
      />
       <ArtistsRow artists={ARTISTS} />

       {/* NEW: All events grid */}
      <AllEventsGrid
        // (optional) pass your events here; otherwise it uses SAMPLE_EVENTS inside
        // events={myEventsFromAPI}
        onCardClick={(e) => navigate(`/events/${e.id}`)}
      />
    </main>
  );
}
