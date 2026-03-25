import { motion } from 'motion/react';
import { Star, Scissors, Calendar, Heart, CheckCircle, Sparkles, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const allReviews = [
  { name: "Мария К.",     pet: "Пудел",            stars: 5, text: "Най-доброто място в София! Моят пудел винаги изглежда като за изложба. Вниманието към детайла е изключително." },
  { name: "Георги С.",    pet: "Немска овчарка",    stars: 5, text: "Професионалисти, които наистина обичат животните. Кучето ми е страхливо, но тук се чувства напълно спокойно." },
  { name: "Елена В.",     pet: "Бишон фризе",       stars: 5, text: "Удобно онлайн записване и страхотна локация. Резултатите винаги надминават очакванията ми. Горещо препоръчвам!" },
  { name: "Петър Д.",     pet: "Голдън ретривър",   stars: 5, text: "Феноменален екип! Кучето ми се връща вкъщи щастливо и ароматно. Вече сме редовни клиенти от 2 години." },
  { name: "Силвия М.",    pet: "Йоркширски териер", stars: 5, text: "Перфектно подстригване всеки път. Виктория е истински художник — кучето ми изглежда невероятно след всяка визита!" },
  { name: "Калоян Н.",    pet: "Хъски",             stars: 5, text: "Специализират се и в по-едрите породи. Хъскито ми беше обслужено с изключителна грижа и търпение." },
  { name: "Десислава Т.", pet: "Чихуахуа",          stars: 5, text: "Много внимателни към малките породи. Атмосферата е спокойна и кучето ми не изпитва никакъв стрес." },
  { name: "Николай В.",   pet: "Лабрадор",          stars: 5, text: "Цените са справедливи, а качеството — премиум. Никога не съм виждал лабрадора ми толкова лъскав и чист!" },
];

function ReviewCard({ review }: { review: typeof allReviews[0] }) {
  return (
    <div className="w-80 flex-shrink-0 bg-[#1A1A1A] border border-outline-variant/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(230,195,100,0.08)] transition-all duration-500 rounded-2xl p-8 text-left group/card cursor-default select-none">
      <Quote className="w-7 h-7 text-primary/30 mb-4 group-hover/card:text-primary/60 transition-colors duration-300" />
      <div className="flex gap-1 mb-4">
        {[...Array(review.stars)].map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-on-surface/75 italic text-base leading-relaxed mb-6">"{review.text}"</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-on-surface text-sm">— {review.name}</span>
        <span className="text-[10px] uppercase tracking-widest text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full">{review.pet}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-label tracking-[0.2em] text-sm font-bold uppercase">ПРОФЕСИОНАЛЕН ГРУМИНГ ЗА КУЧЕТА</span>
            <h1 className="text-6xl md:text-8xl font-headline italic tracking-tight leading-[1.1] text-on-surface">
              Грижа за <br/>всяка козина.
            </h1>
            <p className="text-xl text-on-surface/70 max-w-xl leading-relaxed">
              Премиум грумиране в София — защото Вашето куче заслужава да се чувства толкова добре, колкото изглежда.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/booking"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all duration-300 active:scale-95"
              >
                Запишете час
              </Link>
              <Link
                to="/services"
                className="border border-primary/40 text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/10 transition-all duration-300"
              >
                Нашите услуги →
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[600px] md:h-[800px] overflow-hidden rounded-xl bg-surface-container-low group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/hero_photo.jpeg"
              alt="Премиум Груминг"
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#1A1A1A] border-t border-primary/20 py-8">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10 rounded-xl overflow-hidden">
            {[
              { Icon: Star,     stat: "4.8",   label: "Google рейтинг",       sub: "Базиран на 300+ отзива" },
              { Icon: Heart,    stat: "1 200+", label: "Доволни клиенти",      sub: "Редовни посещения" },
              { Icon: Scissors, stat: "15+",   label: "Услуги",               sub: "За всяка порода" },
              { Icon: Calendar, stat: "7 дни", label: "Онлайн записване",     sub: "Бързо и удобно" },
            ].map(({ Icon, stat, label, sub }, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 px-8 py-6 bg-[#1A1A1A] hover:bg-[#1f1f1f] transition-colors duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-primary font-headline italic text-lg leading-none mb-0.5">{stat}</p>
                  <p className="text-on-surface/80 text-sm font-medium leading-none">{label}</p>
                  <p className="text-on-surface/30 text-xs mt-1 hidden sm:block">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div className="max-w-2xl" {...fadeIn}>
              <span className="text-primary font-label tracking-widest text-sm font-bold">НАШИТЕ УСЛУГИ</span>
              <h2 className="text-5xl font-headline italic mt-4">Всичко от което се нуждае Вашият любимец.</h2>
            </motion.div>
            <Link
              to="/services"
              className="border border-outline-variant text-on-surface px-8 py-3 rounded-lg hover:border-primary hover:text-primary transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Виж всички услуги
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Пълно грумиране",        img: "/images/home1.jpg", objPos: "50% 50%" },
              { title: "Баня & Изсушаване",       img: "/images/home2.jpg", objPos: "85% 50%" },
              { title: "Подстригване & Оформяне", img: "/images/home3.jpg", objPos: "15% 50%" },
              { title: "SPA & Допълнителни",      img: "/images/home4.jpg", objPos: "50% 50%" },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-surface-container-high cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate('/services')}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: service.objPos }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-headline italic mb-2">{service.title}</h3>
                  <div className="h-px w-0 group-hover:w-full bg-primary transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-xl overflow-hidden border-8 border-surface-container-high">
              <img
                src="/images/home5.jpeg"
                alt="Groomer at work"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-secondary-container p-8 rounded-xl hidden lg:block">
              <span className="text-primary font-headline italic text-4xl">10+</span>
              <p className="text-on-surface text-sm uppercase tracking-widest mt-2">Години Отличие</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-label tracking-widest text-sm font-bold">ЗА НАС</span>
            <h2 className="text-5xl font-headline italic leading-tight">Страстта среща прецизността.</h2>
            <div className="space-y-4 text-on-surface/70 text-lg leading-relaxed">
              <p>Ние вярваме, че всеки домашен любимец заслужава внимание към детайла и индивидуално отношение. Нашето студио е създадено като оазис на спокойствието за Вашето куче.</p>
              <p>Използваме само най-висок клас козметика и модерни техники, за да гарантираме перфектен резултат при всяко посещение.</p>
            </div>
            <ul className="space-y-4 pt-4">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-primary" />, text: "Сертифицирани експерти с международен опит" },
                { icon: <Sparkles className="w-5 h-5 text-primary" />, text: "Хипоалергенна и натурална козметика" },
                { icon: <Heart className="w-5 h-5 text-primary" />, text: "Безопасна и спокойна среда без стрес" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-on-surface">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="inline-block text-primary font-bold text-lg hover:translate-x-2 transition-transform duration-300 pt-4"
            >
              Научи повече →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8 text-center mb-16">
          <motion.div {...fadeIn}>
            <span className="text-primary font-label tracking-widest text-sm font-bold">КЛИЕНТСКИ ОТЗИВИ</span>
            <h2 className="text-5xl font-headline italic mt-4">Какво казват собствениците.</h2>
          </motion.div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="mb-5">
          <div className="animate-marquee-left pause-on-hover flex gap-5 w-max px-2.5">
            {[...allReviews.slice(0, 4), ...allReviews.slice(0, 4)].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div>
          <div className="animate-marquee-right pause-on-hover flex gap-5 w-max px-2.5">
            {[...allReviews.slice(4), ...allReviews.slice(4)].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8">
        <motion.div
          className="max-w-5xl mx-auto bg-[#1A1A1A] border border-primary/40 rounded-3xl p-16 text-center space-y-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-5xl font-headline italic">Готови да запишете час?</h2>
          <p className="text-xl text-on-surface/70">Подарете на Вашия любимец преживяването, което заслужава.</p>
          <div className="pt-6">
            <Link
              to="/booking"
              className="inline-block bg-primary text-on-primary px-12 py-5 rounded-lg font-bold text-xl hover:shadow-[0_0_40px_rgba(230,195,100,0.4)] transition-all duration-300 active:scale-95"
            >
              Запишете се сега
            </Link>
          </div>
          <p className="text-primary font-headline italic text-2xl pt-4">+359 888 123 456</p>
        </motion.div>
      </section>
    </div>
  );
}
