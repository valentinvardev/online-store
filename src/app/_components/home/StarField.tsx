type Star = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  slow: boolean;
};

const stars: Star[] = [
  { left: 3,  top: 8,  size: 1.5, delay: 0,   duration: 3.2, slow: false },
  { left: 9,  top: 22, size: 1,   delay: 1.4,  duration: 4.1, slow: true  },
  { left: 14, top: 65, size: 2,   delay: 0.7,  duration: 3.8, slow: false },
  { left: 7,  top: 45, size: 1,   delay: 2.1,  duration: 2.9, slow: true  },
  { left: 19, top: 12, size: 1.5, delay: 3.5,  duration: 4.4, slow: false },
  { left: 23, top: 78, size: 1,   delay: 0.3,  duration: 3.1, slow: true  },
  { left: 28, top: 33, size: 2,   delay: 1.8,  duration: 5.0, slow: false },
  { left: 31, top: 55, size: 1,   delay: 4.2,  duration: 3.6, slow: true  },
  { left: 36, top: 18, size: 1.5, delay: 2.6,  duration: 2.8, slow: false },
  { left: 41, top: 88, size: 1,   delay: 0.9,  duration: 4.3, slow: true  },
  { left: 45, top: 42, size: 2,   delay: 3.1,  duration: 3.5, slow: false },
  { left: 48, top: 7,  size: 1,   delay: 1.5,  duration: 4.8, slow: true  },
  { left: 52, top: 70, size: 1.5, delay: 5.0,  duration: 3.2, slow: false },
  { left: 57, top: 28, size: 1,   delay: 2.3,  duration: 2.7, slow: true  },
  { left: 61, top: 83, size: 2,   delay: 0.6,  duration: 4.1, slow: false },
  { left: 65, top: 15, size: 1,   delay: 3.8,  duration: 3.9, slow: true  },
  { left: 68, top: 50, size: 1.5, delay: 1.1,  duration: 5.2, slow: false },
  { left: 72, top: 37, size: 1,   delay: 4.5,  duration: 3.0, slow: true  },
  { left: 76, top: 92, size: 2,   delay: 2.0,  duration: 4.6, slow: false },
  { left: 79, top: 62, size: 1,   delay: 0.4,  duration: 2.8, slow: true  },
  { left: 83, top: 20, size: 1.5, delay: 3.3,  duration: 3.7, slow: false },
  { left: 87, top: 75, size: 1,   delay: 1.7,  duration: 4.9, slow: true  },
  { left: 91, top: 10, size: 2,   delay: 5.4,  duration: 3.3, slow: false },
  { left: 94, top: 48, size: 1,   delay: 2.8,  duration: 4.0, slow: true  },
  { left: 97, top: 85, size: 1.5, delay: 0.2,  duration: 3.6, slow: false },
  { left: 5,  top: 90, size: 1,   delay: 4.7,  duration: 5.1, slow: true  },
  { left: 12, top: 30, size: 2,   delay: 1.3,  duration: 3.4, slow: false },
  { left: 17, top: 58, size: 1,   delay: 3.9,  duration: 2.6, slow: true  },
  { left: 25, top: 95, size: 1.5, delay: 0.8,  duration: 4.2, slow: false },
  { left: 33, top: 4,  size: 1,   delay: 2.5,  duration: 3.8, slow: true  },
  { left: 39, top: 68, size: 2,   delay: 5.2,  duration: 4.5, slow: false },
  { left: 43, top: 24, size: 1,   delay: 1.0,  duration: 3.0, slow: true  },
  { left: 54, top: 53, size: 1.5, delay: 3.6,  duration: 5.3, slow: false },
  { left: 59, top: 97, size: 1,   delay: 2.2,  duration: 4.7, slow: true  },
  { left: 63, top: 38, size: 2,   delay: 0.5,  duration: 3.1, slow: false },
  { left: 70, top: 6,  size: 1,   delay: 4.0,  duration: 2.9, slow: true  },
  { left: 74, top: 77, size: 1.5, delay: 1.6,  duration: 4.4, slow: false },
  { left: 81, top: 43, size: 1,   delay: 3.4,  duration: 3.7, slow: true  },
  { left: 85, top: 60, size: 2,   delay: 0.1,  duration: 5.0, slow: false },
  { left: 89, top: 32, size: 1,   delay: 2.9,  duration: 4.8, slow: true  },
  { left: 93, top: 16, size: 1.5, delay: 4.3,  duration: 3.2, slow: false },
  { left: 96, top: 71, size: 1,   delay: 1.2,  duration: 2.7, slow: true  },
  { left: 11, top: 82, size: 2,   delay: 3.7,  duration: 4.1, slow: false },
  { left: 46, top: 14, size: 1,   delay: 0.6,  duration: 3.9, slow: true  },
  { left: 77, top: 26, size: 1.5, delay: 5.1,  duration: 4.6, slow: false },
];

type Props = {
  color?: string;
};

export default function StarField({ color = "#fbf5e6" }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: color,
            animation: `${star.slow ? "twinkle-slow" : "twinkle"} ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
