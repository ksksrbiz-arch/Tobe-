"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

const featuredBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    price: "$6",
    bgColor: "#6B1C6F20",
    accentColor: "#6B1C6F",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    price: "$5",
    bgColor: "#1a6b1c20",
    accentColor: "#1a6b1c",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    price: "$7",
    bgColor: "#1e3a8a20",
    accentColor: "#1e3a8a",
  },
  {
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    genre: "Historical",
    price: "$8",
    bgColor: "#b4530920",
    accentColor: "#b45309",
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <PageHero
          title="Shop Our Collection"
          subtitle="Browse thousands of titles online or visit us in person"
          badge="Shop"
          imageUrl="https://images.unsplash.com/photo-1589998059171-988d887df646?w=1600&q=80"
        />
        <ShopSection />

        {/* New & Notable */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#FDF8F0" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#6B1C6F",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              >
                New &amp; Notable
              </h2>
              <div className="w-12 h-1 mx-auto rounded-full mb-2" style={{ background: "#F1BB1A" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredBooks.map((book) => (
                <div
                  key={book.title}
                  className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "white", boxShadow: "0 4px 20px rgba(107,28,111,0.08)" }}
                >
                  {/* Book illustration placeholder */}
                  <div
                    className="flex items-center justify-center"
                    style={{ height: "140px", background: book.bgColor }}
                  >
                    <div
                      className="text-4xl font-bold font-serif"
                      style={{ color: book.accentColor, opacity: 0.4 }}
                    >
                      📖
                    </div>
                  </div>
                  <div className="p-4">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: book.bgColor, color: book.accentColor }}
                    >
                      {book.genre}
                    </span>
                    <h3
                      className="font-bold mt-2 text-sm leading-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a1a" }}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{book.author}</p>
                    <p
                      className="font-bold mt-3 text-base"
                      style={{ color: book.accentColor }}
                    >
                      {book.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm italic mt-6" style={{ color: "#9CA3AF" }}>
              *Inventory changes daily — these are examples only
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
