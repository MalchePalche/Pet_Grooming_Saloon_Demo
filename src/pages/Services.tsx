import { motion } from 'motion/react';
import { Bath, Scissors, Sparkles, Star, Award, CreditCard, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block text-primary tracking-[0.2em] font-medium text-sm mb-6 uppercase">УСЛУГИ</span>
            <h1 className="text-6xl md:text-8xl font-headline italic tracking-tight leading-none mb-8">
              Пълно<br/>Грумиране за Кучета.
            </h1>
            <p className="text-xl text-on-surface/70 max-w-xl font-light leading-relaxed">
              Прозрачни цени, без скрити такси. Нашата мисия е да предоставим на Вашия любимец не просто грижа, а спа изживяване.
            </p>
          </motion.div>
          <div className="hidden md:block pb-4">
            <p className="text-primary italic font-headline text-lg">The Velvet Atelier Standards</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Service Categories */}
      <section className="max-w-7xl mx-auto px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Category 1: Баня & Изсушаване */}
          <motion.div 
            className="md:col-span-7 bg-surface-container-low rounded-xl overflow-hidden group hover:shadow-[0_0_40px_rgba(230,195,100,0.05)] transition-all duration-500"
            {...fadeIn}
          >
            <div className="p-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Bath className="text-primary w-8 h-8" />
                  <h3 className="text-3xl font-headline italic">Баня & Изсушаване</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Малка порода (до 10кг)", price: "€13" },
                    { label: "Средна порода (10-20кг)", price: "€20" },
                    { label: "Голяма порода (20-40кг)", price: "€28" },
                    { label: "Гигантска порода (40кг+)", price: "€36" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                      <span className="text-on-surface/70">{item.label}</span>
                      <span className="text-primary font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category 2: Нокти & Уши */}
          <motion.div 
            className="md:col-span-5 bg-surface-container-high rounded-xl p-10 flex flex-col justify-between border border-primary/5"
            {...fadeIn}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scissors className="text-secondary w-8 h-8" />
                <h3 className="text-3xl font-headline italic">Нокти & Уши</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { label: "Изрязване на нокти", price: "€5" },
                  { label: "Почистване на уши", price: "€6" },
                  { label: "Комбиниран пакет", price: "€9" },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between group/item">
                    <span className="text-on-surface/70 group-hover/item:text-on-surface transition-colors">{item.label}</span>
                    <span className="text-primary">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center px-3 py-1 bg-secondary-container/30 text-secondary text-xs font-bold rounded uppercase tracking-wider">Експресна услуга</span>
            </div>
          </motion.div>

          {/* Category 3: Подстригване */}
          <motion.div 
            className="md:col-span-5 bg-surface-container-high rounded-xl p-10 border border-primary/5"
            {...fadeIn}
          >
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="text-primary w-8 h-8" />
              <h3 className="text-3xl font-headline italic">Подстригване</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Малка порода", price: "€18" },
                { label: "Средна порода", price: "€28" },
                { label: "Голяма порода", price: "€38" },
                { label: "Хигиенно оформяне", price: "€13" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-outline-variant/10">
                  <span className="text-on-surface/70">{item.label}</span>
                  <span className="text-primary">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category 4: Пълен Грумиране Пакет */}
          <motion.div 
            className="md:col-span-7 bg-surface-container-low rounded-xl relative overflow-hidden group"
            {...fadeIn}
          >
            <div className="absolute top-0 right-0 p-6">
              <div className="h-24 w-24 border border-primary/20 rounded-full flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <span className="text-primary text-[10px] uppercase tracking-widest font-bold text-center">Най-<br/>изгодно</span>
              </div>
            </div>
            <div className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary w-8 h-8" />
                <h3 className="text-4xl font-headline italic">Пълен Грумиране Пакет</h3>
              </div>
              <p className="text-on-surface/70 mb-10 max-w-md">Включва всичко от баня, изсушаване, подстригване, нокти, уши и финален стайлинг.</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Малка</span>
                    <span className="text-2xl text-primary">€28</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Средна</span>
                    <span className="text-2xl text-primary">€41</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Голяма</span>
                    <span className="text-2xl text-primary">€56</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Гигант</span>
                    <span className="text-2xl text-primary">€66</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Services */}
          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-surface-container p-8 rounded-xl" {...fadeIn}>
              <div className="flex items-center gap-2 mb-4">
                <Waves className="text-secondary w-6 h-6" />
                <h4 className="text-xl font-headline italic">SPA & Третирания</h4>
              </div>
              <ul className="text-sm space-y-3 text-on-surface/70">
                <li className="flex justify-between"><span>Озонотерапия</span> <span className="text-primary">€8</span></li>
                <li className="flex justify-between"><span>Лечебна маска</span> <span className="text-primary">€5</span></li>
                <li className="flex justify-between"><span>Дълбока хидратация</span> <span className="text-primary">€15</span></li>
              </ul>
            </motion.div>
            <motion.div className="bg-surface-container p-8 rounded-xl" {...fadeIn}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-secondary w-6 h-6" />
                <h4 className="text-xl font-headline italic">Стайлинг</h4>
              </div>
              <ul className="text-sm space-y-3 text-on-surface/70">
                <li className="flex justify-between"><span>Панделки & Аксесоари</span> <span className="text-primary">€3</span></li>
                <li className="flex justify-between"><span>Парфюм "Luxury Dog"</span> <span className="text-primary">€3</span></li>
                <li className="flex justify-between"><span>Временно боядисване</span> <span className="text-primary">€8</span></li>
              </ul>
            </motion.div>
          </div>

          {/* Membership Packages */}
          <motion.div 
            className="md:col-span-6 bg-[#0E0E0E] p-10 rounded-xl border border-outline-variant/30"
            {...fadeIn}
          >
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="text-primary w-8 h-8" />
              <h3 className="text-3xl font-headline italic">Абонаментни Пакети</h3>
            </div>
            <div className="space-y-6">
              {[
                { name: "Базов", desc: "2 посещения / месец", price: "от €23" },
                { name: "Стандарт", desc: "4 посещения / месец", price: "от €41", highlight: true },
                { name: "Премиум", desc: "Неограничени посещения", price: "от €77" },
              ].map((pkg, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    pkg.highlight ? 'bg-primary/5 border border-primary/20' : 'bg-surface-container-highest/20 hover:bg-surface-container-highest/40'
                  }`}
                >
                  <div>
                    <h5 className={`font-bold ${pkg.highlight ? 'text-primary' : 'text-on-surface'}`}>{pkg.name}</h5>
                    <p className="text-xs text-on-surface/40">{pkg.desc}</p>
                  </div>
                  <span className="text-xl font-headline italic text-primary">{pkg.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="max-w-7xl mx-auto px-8 mt-12 mb-24 text-center">
        <p className="text-on-surface/70 italic font-headline text-lg max-w-2xl mx-auto">
          * Моля, имайте предвид, че крайните цени могат да варират в зависимост от размера, породата, темперамента и състоянието на козината на Вашия любимец.
        </p>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="bg-surface-container-low rounded-2xl p-16 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-on-surface italic font-headline text-2xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Не сте сигурни коя услуга е подходяща за вашия любимец? <br/> Свържете се с нас за безплатна консултация.
            </p>
            <Link
              to="/contact"
              className="inline-block gold-gradient-btn text-on-primary px-12 py-4 rounded-lg font-bold text-lg tracking-widest hover:shadow-[0_0_30px_rgba(230,195,100,0.2)] transition-all duration-300 active:scale-95"
            >
              СВЪРЖЕТЕ СЕ С НАС
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
