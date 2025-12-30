"use client";

import Image from "next/image";
import Link from "next/link";
import Homehero from "../components/Homehero";
import CountriesSection from "../components/CountriesSection";
import BookFlightsSection from "../components/BookFlightsSection";
import BoatCruiseSection from "../components/BoatCruiseSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://res.cloudinary.com/dnitzkowt/image/upload/v1767082632/ChatGPT_Image_Dec_30__2025__08_12_29_AM-removebg-preview_voi1mz.png"
            alt="My Travel Advisor logo"
            width={56}
            height={56}
            priority
            className="rounded"
          />
          <span className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">My Travel Advisor</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/who-we-work-with" className="text-sm font-medium text-stone-700 dark:text-stone-200 hover:underline">Who We Work With</Link>
          <Link href="/plan-my-trip" className="text-sm font-medium text-stone-700 dark:text-stone-200 hover:underline">Plan My Trip</Link>
        </nav>
      </header>

      <main>
        <Homehero />

        {/* Theme container: apply site color theme to homepage sections (except hero) */}
        <div className="bg-stone-900 text-white">
          <CountriesSection />
          <BookFlightsSection />
          <BoatCruiseSection type="family" />
        </div>
      </main>
    </div>
  );
}
