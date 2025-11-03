import React from "react";
import { useNavigate } from "react-router-dom";
import PremiereRow from "../components/Stream/PremiereRow";
// Use the hero you already created in the events folder.
// If you duplicated it into components/stream, change the path accordingly.
import HeroSpotlight from "../components/Stream/HeroSpotlight";
import NewOnStreamRow from "../components/Stream/NewOnStreamRow";
import UpcomingReleasesRow from "../components/Stream/UpcomingReleasesRow";
import DiscountRow from "../components/Stream/DiscountRow";

const heroItems = [
  {
    title: "Splitsville",
    runtimeMins: 105,
    genre: "Comedy",
    cert: "A",
    language: "English",
    synopsis:
      "When Ashley asks for a divorce, the good-natured Carey runs to his friends for support. Their secret to happiness is an open marriage—until Carey crosses a line and everything unravels.",
    poster: "splitsville.avif",
    backdrop: "spilt.avif",
  },
  {
    title: "Neon Nights",
    runtimeMins: 128,
    genre: "Thriller",
    cert: "UA",
    language: "Hindi",
    synopsis:
      "A rookie cop chases a phantom hacker through a city that never sleeps.",
    poster: "neon.avif",
    backdrop: "Neon1.avif",
  },
];

const premiereItems = [
  {
    id: "the-grey",
    title: "The Grey",
    languages: "English, Hindi, Tamil, Telugu",
    tag: "PREMIERE",
    poster: "gray.png",
  },
  {
    id: "him",
    title: "HIM",
    languages: "English, Hindi",
    tag: "PREMIERE",
    poster: "Him.png",
  },
  {
    id: "how-to-make-a-killing",
    title: "How to Make a Killing",
    languages: "French",
    tag: "PREMIERE",
    poster: "Killing.png",
  },
  {
    id: "together",
    title: "Together",
    languages: "English",
    tag: "EXCLUSIVE",
    poster: "together.png",
  },
  {
    id: "splitsville",
    title: "Splitsville",
    languages: "English",
    tag: "EXCLUSIVE",
    poster: "Splitsville.png",
  },
];

const newOnStreamItems = [
  { id: "sir", title: "Sir", languages: "Hindi", poster: "sir.png" },
  {
    id: "minecraft",
    title: "The Minecraft Movie",
    languages: "English, Hindi",
    poster: "The_Minecraft_Movie.png",
    badge: { text: "4K AVAILABLE", tone: "indigo" },
  },
  { id: "vanvaas", title: "Vanvaas", languages: "Hindi", poster: "Vanvaas.png" },
  { id: "kida", title: "Kida", languages: "Tamil, Hindi", poster: "Kida.png" },
  { id: "missing-face", title: "Missing Face", languages: "Hindi", poster: "Missing_Face.png" },
];

const upcomingItems = [
  {
    id: "red-rooms",
    title: "Red Rooms",
    languages: "English",
    tag: "PREMIERE",
    poster: "redrooms2.png",
  },
  {
    id: "little-box-of-sweets",
    title: "Little Box of Sweets",
    languages: "Hindi",
    tag: "PREMIERE",
    poster: "Little_Box_of_Sweets.png",
  },
  {
    id: "magma",
    title: "Magma",
    languages: "French",
    tag: "PREMIERE",
    poster: "magna.png",
  },
];

const discountItems = [
  { id: "megan-2", title: "Megan 2.0", languages: "English, Hindi", poster: "megan.avif" },
  { id: "drop", title: "Drop", languages: "English, Hindi", poster: "Drop.avif" },
  { id: "wolfman", title: "Wolf Man", languages: "English", poster: "wolfman.avif" },
  { id: "black-phone", title: "The Black Phone", languages: "English, Hindi", poster: "blackphone.avif" },
  { id: "nosferatu", title: "Nosferatu", languages: "English, Hindi", poster: "nosferaja.avif", badge: { text: "4K AVAILABLE", tone: "indigo" } },
];

export default function StreamPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <HeroSpotlight
        items={heroItems}
        onVideoLibrary={() => navigate("/stream/library")}
      />

      <div className="mt-8 md:mt-10">
        <PremiereRow
          title="Premiere of the week"
          items={premiereItems}
          onSelect={(item) => navigate(`/stream/title/${item.id}`)}
        />
      </div>

       {/* New on Stream (exactly like your screenshot) */}
      <div className="mt-8 md:mt-10">
        <NewOnStreamRow
          title="New on Stream"
          seeAllHref="/stream/new"
          items={newOnStreamItems}
          onSelect={(item) => navigate(`/stream/title/${item.id}`)}
        />
      </div>

      <div className="mt-8 md:mt-10">
        <UpcomingReleasesRow
          title="Upcoming Releases"
          items={upcomingItems}
          onSelect={(item) => navigate(`/stream/title/${item.id}`)}
          onPreBook={(item) => navigate(`/stream/prebook/${item.id}`)}
        />
      </div>

       <div className="mt-8 md:mt-10">
        <DiscountRow
          title="Movies On Discount"
          subtitle="Rent at Half Price, Use Offer Code: Streamsave"
          items={discountItems}
          onSelect={(item) => navigate(`/stream/title/${item.id}`)}
        />
      </div>
    </main>
  );
}
