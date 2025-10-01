import { MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function FloatingWhatsApp() {
  const whatsappNumber = '+255768512626';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        data-testid="floating-whatsapp-button"
        aria-label="Chat with us on WhatsApp"
      >
        <Button
          size="lg"
          className="h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 p-0 flex items-center justify-center"
        >
          <SiWhatsapp className="h-10 w-10 text-white" />
        </Button>
      </a>
      
      {/* Pulsing animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10"></div>
    </div>
  );
}