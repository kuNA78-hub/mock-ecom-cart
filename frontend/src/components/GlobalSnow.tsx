import React from 'react';

const SnowFall: React.FC = () => {
  return (
    <>
      {/* Snowflake Layer */}
      <div className="snow-container">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`snowflake-${i}`}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              '--sway': Math.random() * 2 - 1,
              '--rotate': Math.random(),
              animationDelay: `${Math.random() * 5}s`,
            } as React.CSSProperties}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Snow Particle Layer */}
      <div className="snow-layer">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`snow-particle-${i}`}
            className="snow-particle"
            style={{
              left: `${Math.random() * 100}%`,
              '--sway': Math.random() * 2 - 1,
              animationDelay: `${Math.random() * 10}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};

export default SnowFall;