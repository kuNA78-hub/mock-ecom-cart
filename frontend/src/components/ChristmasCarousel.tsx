// ChristmasCarousel.tsx
import React, { useState, useEffect } from 'react';
import './ChristmasCarousel.css';

const ChristmasCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      title: "Merry Christmas Sale",
      subtitle: "Up to 60% OFF",
      description: "Gift joy this season with premium tech at festive prices!",
      image: "🎄",
      bgGradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      btnGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
    {
      id: 2,
      title: "Festive Bundles",
      subtitle: "Buy 2, Get 1 Free",
      description: "Curated gift sets for family & friends – limited time!",
      image: "🎁",
      bgGradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      btnGradient: "linear-gradient(135deg, #10b981, #059669)",
    },
    {
      id: 3,
      title: "New Year Tech Drop",
      subtitle: "Exclusive Launch",
      description: "Be the first to own 2026’s hottest gadgets!",
      image: "⭐",
      bgGradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
      btnGradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    },
    {
      id: 4,
      title: "Free Express Shipping",
      subtitle: "Worldwide",
      description: "Orders above $50 ship free – arrives before Christmas!",
      image: "🚚",
      bgGradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
      btnGradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="christmas-carousel-pro">
      {/* Snow + Stars Background */}
      <SnowfallBackground />

      <div className="carousel-wrapper">
        <div className="carousel-track-pro" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="carousel-slide-pro"
              style={{ background: offer.bgGradient }}
            >
              <div className="slide-content-pro">
                <div className="offer-emoji-pro">{offer.image}</div>
                <h2 className="offer-title-pro">{offer.title}</h2>
                <h3 className="offer-subtitle-pro">{offer.subtitle}</h3>
                <p className="offer-desc-pro">{offer.description}</p>
                <button
                  className="shop-now-btn-pro"
                  style={{ background: offer.btnGradient }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="nav-arrow left"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length)}
        >
          ❮
        </button>
        <button
          className="nav-arrow right"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % offers.length)}
        >
          ❯
        </button>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {offers.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Snow + Stars Component
const SnowfallBackground: React.FC = () => {
  const snowflakes = Array.from({ length: 70 });
  const stars = Array.from({ length: 25 });

  return (
    <>
      {/* Snow */}
      <div className="snow-layer-pro">
        {snowflakes.map((_, i) => (
          <div
            key={`snow-${i}`}
            className="snowflake-pro"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              fontSize: `${0.8 + Math.random() * 0.8}rem`,
            } as React.CSSProperties}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Twinkling Stars */}
      <div className="star-layer-pro">
        {stars.map((_, i) => (
          <div
            key={`star-${i}`}
            className="twinkle-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            } as React.CSSProperties}
          >
            ✦
          </div>
        ))}
      </div>
    </>
  );
};

export default ChristmasCarousel;