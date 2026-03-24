import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const galleryItems = [
  // Груминг
  { id: 1,  category: 'Груминг', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800', title: 'Трансформация на пудел' },
  { id: 4,  category: 'Груминг', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800', title: 'Хигиена на бигъл' },
  { id: 7,  category: 'Груминг', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800', title: 'Десходинг на хъски' },
  { id: 9,  category: 'Груминг', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800', title: 'Подстригване на лабрадор' },
  { id: 10, category: 'Груминг', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800', title: 'Груминг на такса' },
  // Баня
  { id: 6,  category: 'Баня', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800', title: 'Баня на лабрадор' },
  { id: 11, category: 'Баня', img: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&q=80&w=800', title: 'СПА баня за голдън' },
  { id: 12, category: 'Баня', img: '/images/gallery8.jpg', title: 'Освежаваща баня за шпиц' },
  { id: 13, category: 'Баня', img: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&q=80&w=800', title: 'Дълбоко почистване на ретривър' },
  // Стайлинг
  { id: 5,  category: 'Стайлинг', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800', title: 'Стил за фрис булдог' },
  { id: 14, category: 'Стайлинг', img: '/images/gallery11.jpg', title: 'Пухкав стайлинг на шпиц' },
  { id: 15, category: 'Стайлинг', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800', title: 'Елегантен стайлинг на пудел' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('Всички');
  const categories = ['Всички', 'Груминг', 'Баня', 'Стайлинг'];

  const filteredItems = filter === 'Всички'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 inline-block">ГАЛЕРИЯ</span>
          <h1 className="text-6xl md:text-8xl font-headline italic mb-8">Нашите щастливи клиенти.</h1>
          <p className="text-on-surface/60 max-w-2xl mx-auto text-lg font-light">
            Разгледайте част от нашите трансформации. Всеки любимец е уникален и заслужава индивидуален подход.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 rounded-full border transition-all duration-300 uppercase tracking-widest text-xs font-bold ${
                filter === cat 
                  ? 'bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(230,195,100,0.3)]' 
                  : 'border-outline-variant/30 text-on-surface/60 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-screen-2xl mx-auto px-8">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-high cursor-pointer"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-1 block">{item.category}</span>
                <h3 className="text-xl font-headline italic text-on-surface">{item.title}</h3>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Instagram CTA */}
      <section className="max-w-4xl mx-auto px-8 mt-32 text-center">
        <div className="p-12 border border-outline-variant/20 rounded-2xl bg-surface-container-low">
          <h2 className="text-3xl font-headline italic mb-6">Искате да видите повече?</h2>
          <p className="text-on-surface/60 mb-8">Последвайте ни в Instagram за ежедневни дози щастливи кучета и полезни съвети.</p>
          <a
            href="https://www.instagram.com/dogbarberbg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-primary text-primary px-10 py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all duration-300"
          >
            @dogbarberbg
          </a>
        </div>
      </section>
    </div>
  );
}
