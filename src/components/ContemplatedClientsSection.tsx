import { useState, useEffect, useCallback } from "react";
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
  const [startIndex, setStartIndex] = useState(0);

  const totalGroups = clientImages.length;

  const nextGroup = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % totalGroups);
  }, [totalGroups]);

  const prevGroup = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  }, [totalGroups]);

  useEffect(() => {
    const interval = setInterval(nextGroup, 3000);
    return () => clearInterval(interval);
  }, [nextGroup]);

  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < ITEMS_PER_VIEW; i++) {
      images.push(clientImages[(startIndex + i) % clientImages.length]);
    }
    return images;
  };

  return (
    <section id="clientes" className="py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Título */}
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

        {/* Grid 3x3 */}
        <div className="max-w-5xl mx-auto relative">
          {/* Setas de navegação */}
          <button
            onClick={prevGroup}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors -translate-x-1/2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={nextGroup}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors translate-x-1/2"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Grid de imagens */}
          <div className="grid grid-cols-3 gap-4 px-8 md:px-10">
            {getVisibleImages().map((image, index) => (
              <div
                key={`${startIndex + index}`}
                className="bg-card rounded-xl shadow-md overflow-hidden transition-transform duration-500 hover:scale-105"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {clientImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === startIndex ? "bg-primary w-6" : "bg-primary/30"
                }`}
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContemplatedClientsSection;
