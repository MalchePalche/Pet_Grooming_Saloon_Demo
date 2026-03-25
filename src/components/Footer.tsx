import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] w-full py-16 border-t border-[#2A2A2A]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-xl font-headline italic text-on-surface">Вашият бизнес</div>
          <p className="text-on-surface/60 leading-relaxed">
            Премиум грижа за Вашия любимец в сърцето на София. Където стилът среща любовта към животните.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-primary font-bold uppercase text-xs tracking-widest">Навигация</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Начало</Link></li>
            <li><Link to="/about" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">За нас</Link></li>
            <li><Link to="/services" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Услуги</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-primary font-bold uppercase text-xs tracking-widest">Поддръжка</h4>
          <ul className="space-y-2">
            <li><Link to="/gallery" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Галерия</Link></li>
            <li><Link to="/contact" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Контакти</Link></li>
            <li><a href="#" className="text-on-surface/60 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Политика за поверителност</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-primary font-bold uppercase text-xs tracking-widest">Контакти</h4>
          <p className="text-on-surface/60">гр. София, ул. "Любимец" 12</p>
          <p className="text-on-surface/60">Пон - Съб: 09:00 - 19:00</p>
          <div className="flex gap-4 pt-2">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-on-surface/60 hover:text-primary cursor-pointer transition-colors" />
            </a>
            <Facebook className="w-5 h-5 text-on-surface/60 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pt-16 mt-16 border-t border-outline-variant/10 text-center text-on-surface/40 text-sm">
        © 2025 Вашият бизнес. Всички права запазени.
      </div>
    </footer>
  );
}
