import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, MessageCircle, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

interface HeroSectionProps {
  onSimulateClick: () => void;
}

const HeroSection = ({ onSimulateClick }: HeroSectionProps) => {
  const badges = [
    { icon: Heart, text: "100% Gratuito" },
    { icon: ShieldCheck, text: "Sem consulta ao SPC" },
    { icon: MessageCircle, text: "Resultado no WhatsApp" },
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#e7f3ff' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagem - Esquerda */}
          <div className="relative order-1" style={{ animation: 'slideInLeft 1s ease-out forwards' }}>
            <img
              src={heroImage}
              alt="Casa, carro e retro escavadeira - Cota Investimentos"
              className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Texto - Direita */}
          <div className="space-y-6 order-2" style={{ animation: 'slideInRight 1s ease-out forwards' }}>
            {/* Social proof */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                + de 1.000 famílias já realizaram seus sonhos
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-primary">
              Seu sonho está mais perto do que você imagina
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-lg">
              Simule seu crédito gratuitamente e descubra o caminho para conquistar a casa própria, o carro novo ou qualquer bem que você deseja
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2"
                  style={{ animation: `slideInRight 0.8s ease-out ${0.3 + index * 0.15}s forwards`, opacity: 0 }}
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-start gap-4" style={{ animation: 'slideInRight 0.8s ease-out 0.75s forwards', opacity: 0 }}>
              <Button
                onClick={onSimulateClick}
                size="lg"
                className="text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Quero realizar meu sonho
              </Button>
              <span className="text-sm text-muted-foreground self-center">
                Sem compromisso · Leva menos de 1 minuto
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
