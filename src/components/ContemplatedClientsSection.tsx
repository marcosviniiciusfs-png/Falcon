import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

import client1 from "@/assets/clients/client-1.jpeg";
import client2 from "@/assets/clients/client-2.jpeg";
import client3 from "@/assets/clients/client-3.jpeg";
import client4 from "@/assets/clients/client-4.jpeg";
import client5 from "@/assets/clients/client-5.jpeg";
import client6 from "@/assets/clients/client-6.jpeg";
import client7 from "@/assets/clients/client-7.jpeg";
import client8 from "@/assets/clients/client-8.jpeg";
import client9 from "@/assets/clients/client-9.jpeg";

const clientImages = [
  { src: client1, alt: "Cliente contemplado 1" },
  { src: client2, alt: "Cliente contemplado 2" },
  { src: client3, alt: "Cliente contemplado 3" },
  { src: client4, alt: "Cliente contemplado 4" },
  { src: client5, alt: "Cliente contemplado 5" },
  { src: client6, alt: "Cliente contemplado 6" },
  { src: client7, alt: "Cliente contemplado 7" },
  { src: client8, alt: "Cliente contemplado 8" },
  { src: client9, alt: "Cliente contemplado 9" },
];

const ITEMS_PER_VIEW = 3;

const ContemplatedClientsSection = () => {
  const total = clientImages.length;
  const offset = ITEMS_PER_VIEW;

  const extendedImages = [
    ...clientImages.slice(-ITEMS_PER_VIEW),
    ...clientImages,
    ...clientImages.slice(0, ITEMS_PER_VIEW),
  ];

  const [internalIndex, setInternalIndex] = useState(offset);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isAnimating = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        setInternalIndex((prev) => prev + 1);
      }
    }, 4000);
  }, []);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  useEffect(() => {
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    }
  }, [transitionEnabled]);

  const handleTransitionEnd = () => {
    isAnimating.current = false;
    if (internalIndex >= offset + total) {
      setTransitionEnabled(false);
      setInternalIndex(internalIndex - total);
    } else if (internalIndex < offset) {
      setTransitionEnabled(false);
      setInternalIndex(internalIndex + total);
    }
  };

  const next = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setInternalIndex((prev) => prev + 1);
    resetInterval();
  };

  const prev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setInternalIndex((prev) => prev - 1);
    resetInterval();
  };

  const realIndex = ((internalIndex - offset) % total + total) % total;

  return (
    <section id="clientes" className="py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Clientes Contemplados
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Veja alguns dos nossos clientes que já realizaram seus sonhos conosco
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors -translate-x-1/2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors translate-x-1/2"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          <div className="overflow-hidden px-8 md:px-10">
            <div
              className="flex"
              style={{
                transform: `translateX(-${internalIndex * (100 / ITEMS_PER_VIEW)}%)`,
                transition: transitionEnabled
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / ITEMS_PER_VIEW}%` }}
                >
                  <div className="bg-card rounded-xl shadow-md overflow-hidden w-full aspect-square">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {clientImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating.current) return;
                  isAnimating.current = true;
                  setInternalIndex(offset + index);
                  resetInterval();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === realIndex ? "bg-primary w-6" : "bg-primary/30"
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContemplatedClientsSection;
