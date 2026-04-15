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

const ContemplatedClientsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % clientImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + clientImages.length) % clientImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

        {/* Carrossel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card rounded-2xl shadow-lg p-4 md:p-6">
            {/* Setas de navegação */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Imagem */}
            <div className="px-8 md:px-10">
              <img
                src={clientImages[currentIndex].src}
                alt={clientImages[currentIndex].alt}
                className="w-full h-auto rounded-xl object-contain max-h-[500px]"
              />
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-4">
              {clientImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContemplatedClientsSection;
