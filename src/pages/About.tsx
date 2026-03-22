import { motion } from 'motion/react';
import { ShieldCheck, Scissors, Waves, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="px-8 py-16 md:py-24 max-w-screen-2xl mx-auto">
        <motion.div 
          className="flex flex-col items-start mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">ЗА НАС</span>
          <h1 className="cormorant text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-on-surface mb-8 max-w-4xl tracking-tight italic">
            Грижим се за всяко куче.
          </h1>
          <p className="text-xl md:text-2xl text-on-surface/70 max-w-2xl leading-relaxed font-light">
            Не само козината — тяхното спокойствие, безопасност и щастие.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative w-full aspect-[21/9] overflow-hidden rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Интериор на луксозен салон" 
            className="w-full h-full object-cover grayscale-[20%] contrast-[1.1] brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="px-8 py-24 md:py-40 bg-surface-container-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1000" 
                alt="Founder with dog" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-container rounded-full flex items-center justify-center p-4 text-center border-4 border-surface shadow-xl">
              <span className="cormorant text-xs italic text-on-surface leading-none">Основана 2015 София</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="cormorant text-5xl md:text-6xl text-primary mb-12">Нашата история</h2>
            <div className="space-y-8 text-on-surface/70 leading-relaxed text-lg font-light">
              <p>Всичко започна с една проста мечта и голяма любов към кучетата. Нашата история не е просто бизнес история, а пътешествие, родено от желанието да осигурим на четириногите ни приятели грижата, която те заслужават – без стрес, с внимание към всеки детайл и в обстановка на пълно спокойствие.</p>
              <p>През годините превърнахме малкото ателие в София в предпочитана дестинация за стопани, които търсят нещо повече от обикновено подстригване. Ние вярваме, че грумингът е изкуство, което изисква търпение, умение и най-вече – разбиране на нуждите на всяко животно.</p>
              <p>Днес "Вашият бизнес" е символ на качество и доверие. Нашата мисия остава непроменена: да предоставяме премиум услуги, които карат всяко куче да се чувства специално, а неговият стопанин – напълно спокоен за своя любимец.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-8 py-24 md:py-40 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">НАШИТЕ ЦЕННОСТИ</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden border border-outline-variant/20">
          {[
            { Icon: ShieldCheck, title: "Безопасност на първо място", text: "Използваме само сертифицирано оборудване и техники, които гарантират физическото и емоционално здраве на Вашето куче." },
            { Icon: Scissors,    title: "Умение & Прецизност",        text: "Нашите професионалисти непрекъснато се усъвършенстват, за да предложат най-съвременните и стилни визии за Вашия любимец." },
            { Icon: Waves,       title: "Грижа & Спокойствие",        text: "Създаваме среда без стрес, където кучетата се чувстват релаксирани, сякаш са в истински СПА център." },
            { Icon: Star,        title: "Премиум продукти",            text: "Работим единствено с висок клас хипоалергенна козметика, съобразена с типа козина и кожа на животното." },
          ].map(({ Icon, title, text }, i) => (
            <motion.div
              key={i}
              className="p-12 md:p-16 bg-surface-container hover:bg-surface-container-high transition-colors duration-500 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8 w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="cormorant text-3xl text-on-surface mb-6 italic">{title}</h3>
              <p className="text-on-surface/70 leading-relaxed font-light">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="px-8 py-24 md:py-40 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">НАШИЯТ ЕКИП</span>
            <h2 className="cormorant text-5xl md:text-6xl text-on-surface mt-2 italic">Запознайте се с екипа.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Ана", role: "Главна стилистка", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", desc: "С над 10 години опит и страст към терапевтичните процедури." },
              { name: "Виктория", role: "Експерт подстригване", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", desc: "Специалист по изложбени визии и креативен груминг." },
              { name: "Димитър", role: "Специалист хигиена", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", desc: "Виртуоз в работата с по-чувствителни и плахи кучета." },
            ].map((member, i) => (
              <motion.div 
                key={i}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-outline-variant/30 group-hover:border-primary/50 transition-colors duration-500">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="cormorant text-3xl text-on-surface italic mb-2">{member.name}</h4>
                <span className="text-secondary tracking-widest uppercase text-xs font-bold mb-4">{member.role}</span>
                <p className="text-on-surface/70 font-light leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-8 py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="cormorant text-6xl md:text-8xl text-on-surface mb-12 italic leading-tight">
            Елате и се убедете сами.
          </h2>
          <Link
            to="/booking"
            className="inline-block bg-primary text-on-primary px-12 py-5 rounded-lg text-lg font-bold tracking-widest uppercase hover:bg-primary-container transition-all duration-300 shadow-[0_0_30px_rgba(230,195,100,0.2)] active:scale-95"
          >
            Запишете час
          </Link>
        </div>
      </section>
    </div>
  );
}
