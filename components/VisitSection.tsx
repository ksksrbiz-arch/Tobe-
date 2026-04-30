"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

export default function VisitSection() {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("7931 SE King Rd, Milwaukie, OR 97222");
    toast.success("Address copied to clipboard!");
  };

  return (
    <section id="visit" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: "#6B1C6F15", color: "#6B1C6F" }}
          >
            Visit Us
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B1C6F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Find Us in Milwaukie
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "#F1BB1A" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-6">
            {/* Address */}
            <div
              className="flex gap-4 p-5 rounded-2xl"
              style={{ background: "#FDF8F0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#6B1C6F" }}
              >
                <MapPin size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#1a1a1a" }}>Address</h3>
                <p style={{ color: "#374151" }}>7931 SE King Rd</p>
                <p style={{ color: "#374151" }}>Milwaukie, OR 97222</p>
                <button
                  onClick={handleCopyAddress}
                  className="mt-2 text-xs font-medium underline"
                  style={{ color: "#6B1C6F" }}
                >
                  Copy address
                </button>
              </div>
            </div>

            {/* Phone */}
            <div
              className="flex gap-4 p-5 rounded-2xl"
              style={{ background: "#FDF8F0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#6B1C6F" }}
              >
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#1a1a1a" }}>Phone</h3>
                <a
                  href="tel:503-659-2559"
                  className="transition-colors"
                  style={{ color: "#6B1C6F", fontWeight: 600 }}
                >
                  503-659-2559
                </a>
              </div>
            </div>

            {/* Email */}
            <div
              className="flex gap-4 p-5 rounded-2xl"
              style={{ background: "#FDF8F0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#6B1C6F" }}
              >
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#1a1a1a" }}>Email</h3>
                <a
                  href="mailto:TBR@tcpbusiness8.com"
                  className="transition-colors break-all"
                  style={{ color: "#6B1C6F", fontWeight: 600 }}
                >
                  TBR@tcpbusiness8.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div
              className="flex gap-4 p-5 rounded-2xl"
              style={{ background: "#FDF8F0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#6B1C6F" }}
              >
                <Clock size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#1a1a1a" }}>Hours</h3>
                <p style={{ color: "#374151" }}>
                  <strong>Monday – Saturday</strong>
                  <br />
                  10:00 AM – 5:00 PM
                </p>
                <p className="mt-2 text-sm italic" style={{ color: "#6B7280" }}>
                  *Sometimes may open late due to finishing a chapter!
                </p>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ minHeight: "400px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.4521!2d-122.6317!3d45.4397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495671e!2s7931%20SE%20King%20Rd%2C%20Milwaukie%2C%20OR%2097222!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clackamas Book Exchange location map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
