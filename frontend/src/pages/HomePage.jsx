import React, { useState, useEffect } from "react";
import handshakeImage from "../assets/handshake.svg";
import bgImage from "../assets/gradient_BG.png";

// Card + Event Images
import connectPeople from "../assets/connect_people.webp";
import lostFoundImg from "../assets/lostfound.webp";
import marketplaceImg from "../assets/marketplace.webp";
import eventDefault from "../assets/event_default.jpg";

import "../styles/HomePage.css";

import { Button } from "../components/commonComponents/GradientButton";
import { NormalButton } from "../components/commonComponents/NormalButton";
import { useNavigate } from "react-router-dom";
import { TbMoodSmile } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";

export const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // WHY UNICONNECT cards
  const cardData = [
    {
      icon: <TbMoodSmile size={32} className="text-orange-700" />,
      title: "Discover Opportunities",
      description:
        "Explore campus events, clubs, and projects tailored to your interests.",
      img: connectPeople,
    },
    {
      icon: <FiBox size={32} className="text-blue-900" />,
      title: "Lost & Found",
      description: "Misplaced something? Found an item? Help each other.",
      img: lostFoundImg,
    },
    {
      icon: <HiUserGroup size={32} className="text-green-700" />,
      title: "Collaborate & Grow",
      description:
        "Connect with classmates to build ideas, study together, and grow.",
      img: marketplaceImg,
    },
  ];

  // Fetch events
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* ====================== HERO SECTION ====================== */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="hero-title">
          Connect. <br /> Collaborate. <br /> Discover.
        </h1>

        <img src={handshakeImage} alt="Handshake" className="hero-icon" />

        <p className="hero-subtitle">
          All within campus. Collaborate and help each other grow.
        </p>

        <div className="hero-buttons">
          <Button name="Discover" onClick={() => navigate("/discover")} />
          <NormalButton
            name="Collaborate"
            onClick={() => navigate("/marketplace")}
          />
        </div>
      </div>

      {/* ====================== WHY SECTION ====================== */}
      <div className="why-section">
        <h2 className="section-title">Why UniConnect?</h2>

        <div className="why-grid">
          {cardData.map((card, idx) => (
            <div key={idx} className="why-card">
              <img src={card.img} alt={card.title} className="why-image" />

              <div className="why-header">
                {card.icon}
                <h3>{card.title}</h3>
              </div>

              <p className="why-text">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================== EVENTS SECTION ====================== */}
      <div className="events-section">
        <h2 className="events-title">Upcoming Events</h2>
        <p className="events-subtitle">
          Stay updated with workshops, meetups, and campus events.
        </p>

        <div className="events-grid">
          {events.map((event, idx) => (
            <div key={idx} className="event-card">
              <img src={eventDefault} alt="Event" className="event-image" />
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================== REMOVED FOOTER ====================== */}
      {/* Footer removed as requested */}
    </>
  );
};
