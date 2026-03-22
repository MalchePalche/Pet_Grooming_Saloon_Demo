import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors, Bath, Sparkles, Award, Waves, ChevronLeft, ChevronRight,
  CheckCircle, Calendar, Clock, User, ArrowRight, ArrowLeft, Dog,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 1, name: 'Пълно грумиране',     desc: 'Баня, изсушаване, подстригване, нокти, уши и финален стайлинг', price: 'от €28', duration: '2–3 ч.',  Icon: Award    },
  { id: 2, name: 'Баня & Изсушаване',  desc: 'Дълбоко почистване с премиум хипоалергенна козметика',           price: 'от €13', duration: '1–1.5 ч.', Icon: Bath     },
  { id: 3, name: 'Подстригване',        desc: 'Оформяне по стандарт на породата от сертифициран специалист',    price: 'от €18', duration: '1–2 ч.',   Icon: Scissors },
  { id: 4, name: 'Нокти & Уши',         desc: 'Изрязване на нокти и почистване на уши — бързо и безболезнено',  price: 'от €5',  duration: '20–30 мин', Icon: Scissors },
  { id: 5, name: 'SPA & Третирания',    desc: 'Озонотерапия, лечебни маски и дълбока хидратация на козината',   price: 'от €8',  duration: '30–60 мин', Icon: Waves    },
  { id: 6, name: 'Стайлинг',            desc: 'Панделки, аксесоари, парфюм и временно боядисване',               price: 'от €3',  duration: '15–30 мин', Icon: Sparkles },
];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

// Pretend a few slots are already booked
const BOOKED: Record<string, string[]> = {
  [fmtKey(addDays(new Date(), 1))]: ['10:00', '14:00'],
  [fmtKey(addDays(new Date(), 2))]: ['09:00', '11:00', '15:00'],
  [fmtKey(addDays(new Date(), 4))]: ['13:00', '16:00'],
};

const MONTHS_BG = ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември'];
const DAYS_BG   = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];

function fmtKey(d: Date) {
  return d.toISOString().slice(0, 10);
}
function addDays(d: Date, n: number) {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
}
function fmtDateBG(d: Date) {
  return `${d.getDate()} ${MONTHS_BG[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: 'Услуга',  Icon: Scissors  },
  { n: 2, label: 'Дата',    Icon: Calendar  },
  { n: 3, label: 'Данни',   Icon: User      },
  { n: 4, label: 'Потвърждение', Icon: CheckCircle },
];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-16">
      {STEPS.map(({ n, label, Icon }, i) => (
        <div key={n} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              step > n  ? 'bg-primary border-primary text-on-primary' :
              step === n ? 'border-primary text-primary bg-primary/10' :
                          'border-outline-variant/30 text-on-surface/30'
            }`}>
              {step > n ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-bold hidden sm:block transition-colors duration-500 ${
              step >= n ? 'text-primary' : 'text-on-surface/30'
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 sm:w-20 h-px mx-2 mb-5 transition-colors duration-700 ${step > n ? 'bg-primary' : 'bg-outline-variant/20'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function BookingCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(() => { const d = new Date(); d.setDate(1); return d; });

  const year  = view.getFullYear();
  const month = view.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rawFirst = new Date(year, month, 1).getDay();          // 0=Sun
  const offset   = rawFirst === 0 ? 6 : rawFirst - 1;          // shift to Mon=0

  const cells: (number | null)[] = [...Array(offset).fill(null)];
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const canGoPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-container-high disabled:opacity-20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-headline italic text-lg text-on-surface">{MONTHS_BG[month]} {year}</span>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_BG.map((d) => (
          <div key={d} className={`text-center text-[10px] font-bold uppercase tracking-widest py-1 ${d === 'Нд' ? 'text-outline' : 'text-on-surface/40'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date    = new Date(year, month, day);
          const isSun   = date.getDay() === 0;
          const isPast  = date < today;
          const disabled = isSun || isPast;
          const isSelected = selected && date.toDateString() === selected.toDateString();
          const isToday    = date.toDateString() === today.toDateString();

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`
                relative aspect-square rounded-lg text-sm font-medium transition-all duration-200
                ${disabled    ? 'text-on-surface/15 cursor-not-allowed' : 'hover:bg-primary/10 hover:text-primary cursor-pointer'}
                ${isSelected  ? '!bg-primary !text-on-primary shadow-[0_0_15px_rgba(230,195,100,0.3)]' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-primary/40 text-primary' : ''}
                ${isSun && !disabled ? 'text-outline/50' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  dogName: string;
  dogBreed: string;
  notes: string;
}
interface ClientErrors {
  name?: string;
  phone?: string;
  email?: string;
  dogName?: string;
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function Booking() {
  const [step, setStep]      = useState(1);
  const [dir,  setDir]       = useState(1);
  const [done, setDone]      = useState(false);

  const [service,  setService]  = useState<typeof SERVICES[0] | null>(null);
  const [date,     setDate]     = useState<Date | null>(null);
  const [time,     setTime]     = useState<string | null>(null);
  const [info,     setInfo]     = useState<ClientInfo>({ name: '', phone: '', email: '', dogName: '', dogBreed: '', notes: '' });
  const [errors,   setErrors]   = useState<ClientErrors>({});
  const [loading,  setLoading]  = useState(false);

  // scroll to top on step change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  function goTo(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
  }

  function validateInfo(): ClientErrors {
    const e: ClientErrors = {};
    if (!info.name.trim())    e.name    = 'Въведете Вашите имена.';
    if (!info.phone.trim())   e.phone   = 'Въведете телефонен номер.';
    if (!info.email.trim())   e.email   = 'Въведете имейл адрес.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) e.email = 'Невалиден имейл адрес.';
    if (!info.dogName.trim()) e.dogName = 'Въведете името на кучето.';
    return e;
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  }

  const bookedForDay = date ? (BOOKED[fmtKey(date)] ?? []) : [];

  if (done) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-8">
        <motion.div
          className="max-w-xl w-full text-center space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-primary mx-auto" />
          </motion.div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h1 className="text-5xl font-headline italic">Записването е потвърдено!</h1>
          <p className="text-on-surface/60 text-lg">
            Очаква Ви посещение при нас на{' '}
            <span className="text-primary font-semibold">{date ? fmtDateBG(date) : ''}</span>{' '}
            в <span className="text-primary font-semibold">{time}</span> ч.
          </p>
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface/50">Услуга</span>
              <span className="text-on-surface font-medium">{service?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface/50">Куче</span>
              <span className="text-on-surface font-medium">{info.dogName}{info.dogBreed ? ` (${info.dogBreed})` : ''}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface/50">Клиент</span>
              <span className="text-on-surface font-medium">{info.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface/50">Телефон</span>
              <span className="text-on-surface font-medium">{info.phone}</span>
            </div>
          </div>
          <p className="text-on-surface/40 text-sm">Ще Ви изпратим потвърждение на {info.email}. До скоро! 🐾</p>
          <button
            onClick={() => { setDone(false); setStep(1); setDir(1); setService(null); setDate(null); setTime(null); setInfo({ name:'',phone:'',email:'',dogName:'',dogBreed:'',notes:'' }); }}
            className="border border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all duration-300"
          >
            Ново записване
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-8">

        {/* Header */}
        <div className="mb-12">
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 inline-block">ОНЛАЙН ЗАПИСВАНЕ</span>
          <h1 className="text-5xl md:text-7xl font-headline italic">Book Your Visit.</h1>
        </div>

        <StepIndicator step={step} />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* ── STEP 1: Service ───────────────────────────────────────── */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-headline italic text-on-surface mb-8">Изберете услуга</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {SERVICES.map((svc) => {
                    const selected = service?.id === svc.id;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => setService(svc)}
                        className={`text-left p-6 rounded-xl border transition-all duration-300 group ${
                          selected
                            ? 'border-primary bg-primary/5 shadow-[0_0_25px_rgba(230,195,100,0.1)]'
                            : 'border-outline-variant/20 bg-surface-container-low hover:border-primary/40 hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selected ? 'bg-primary/20' : 'bg-surface-container-high group-hover:bg-primary/10'
                          }`}>
                            <svc.Icon className={`w-5 h-5 transition-colors ${selected ? 'text-primary' : 'text-on-surface/50 group-hover:text-primary'}`} />
                          </div>
                          {selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <CheckCircle className="w-3 h-3 text-on-primary" />
                            </motion.div>
                          )}
                        </div>
                        <h3 className={`font-bold text-lg mb-1 transition-colors ${selected ? 'text-primary' : 'text-on-surface'}`}>{svc.name}</h3>
                        <p className="text-on-surface/50 text-sm mb-4 leading-relaxed">{svc.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${selected ? 'text-primary' : 'text-primary/70'}`}>{svc.price}</span>
                          <span className="flex items-center gap-1 text-on-surface/30 text-xs">
                            <Clock className="w-3 h-3" />{svc.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={!service}
                    onClick={() => goTo(2)}
                    className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Напред <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Date & Time ───────────────────────────────────── */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-headline italic text-on-surface mb-8">Изберете дата и час</h2>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-10">
                  <BookingCalendar selected={date} onSelect={(d) => { setDate(d); setTime(null); }} />

                  {/* Time slots */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-on-surface/60 text-sm">
                        {date ? fmtDateBG(date) : 'Изберете дата, за да видите свободните часове'}
                      </span>
                    </div>

                    {date ? (
                      <div className="grid grid-cols-2 gap-3">
                        {TIME_SLOTS.map((slot) => {
                          const booked   = bookedForDay.includes(slot);
                          const selected = time === slot;
                          return (
                            <button
                              key={slot}
                              disabled={booked}
                              onClick={() => setTime(slot)}
                              className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                                booked
                                  ? 'border-outline-variant/10 text-on-surface/15 cursor-not-allowed line-through'
                                  : selected
                                    ? 'border-primary bg-primary text-on-primary shadow-[0_0_15px_rgba(230,195,100,0.3)]'
                                    : 'border-outline-variant/20 text-on-surface/70 hover:border-primary/50 hover:text-primary hover:bg-primary/5'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-surface-container-low rounded-xl border border-outline-variant/10 min-h-[200px]">
                        <div className="text-center text-on-surface/30 space-y-2">
                          <Calendar className="w-8 h-8 mx-auto opacity-40" />
                          <p className="text-sm">Изберете дата от календара</p>
                        </div>
                      </div>
                    )}

                    {date && (
                      <p className="mt-4 text-xs text-on-surface/30 italic">
                        * Зачертаните часове са вече заети. Неделя — почивен ден.
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected summary chip */}
                {(date || time) && (
                  <motion.div
                    className="mb-6 flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {date && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
                        <Calendar className="w-3.5 h-3.5" />{fmtDateBG(date)}
                      </span>
                    )}
                    {time && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
                        <Clock className="w-3.5 h-3.5" />{time} ч.
                      </span>
                    )}
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <button onClick={() => goTo(1)} className="flex items-center gap-2 text-on-surface/50 hover:text-on-surface px-4 py-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>
                  <button
                    disabled={!date || !time}
                    onClick={() => goTo(3)}
                    className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Напред <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Client info ───────────────────────────────────── */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-headline italic text-on-surface mb-8">Информация за клиента</h2>
                <div className="space-y-6 mb-10">
                  {/* Owner */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Данни за стопанина
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Три имена *" error={errors.name}>
                        <input
                          type="text"
                          value={info.name}
                          placeholder="Иван Петров"
                          onChange={(e) => { setInfo(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                          className={inputCls(!!errors.name)}
                        />
                      </Field>
                      <Field label="Телефон *" error={errors.phone}>
                        <input
                          type="tel"
                          value={info.phone}
                          placeholder="+359 888 123 456"
                          onChange={(e) => { setInfo(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: undefined })); }}
                          className={inputCls(!!errors.phone)}
                        />
                      </Field>
                      <Field label="Имейл адрес *" error={errors.email} className="sm:col-span-2">
                        <input
                          type="email"
                          value={info.email}
                          placeholder="ivan@example.com"
                          onChange={(e) => { setInfo(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
                          className={inputCls(!!errors.email)}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Dog */}
                  <div className="pt-2 border-t border-outline-variant/10">
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2 mt-4">
                      🐾 Данни за кучето
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Кличка *" error={errors.dogName}>
                        <input
                          type="text"
                          value={info.dogName}
                          placeholder="Пудел"
                          onChange={(e) => { setInfo(p => ({ ...p, dogName: e.target.value })); setErrors(p => ({ ...p, dogName: undefined })); }}
                          className={inputCls(!!errors.dogName)}
                        />
                      </Field>
                      <Field label="Порода">
                        <input
                          type="text"
                          value={info.dogBreed}
                          placeholder="Той пудел (незадължително)"
                          onChange={(e) => setInfo(p => ({ ...p, dogBreed: e.target.value }))}
                          className={inputCls(false)}
                        />
                      </Field>
                      <Field label="Допълнителни бележки" className="sm:col-span-2">
                        <textarea
                          rows={3}
                          value={info.notes}
                          placeholder="Алергии, специални изисквания, темперамент..."
                          onChange={(e) => setInfo(p => ({ ...p, notes: e.target.value }))}
                          className={`${inputCls(false)} resize-none`}
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => goTo(2)} className="flex items-center gap-2 text-on-surface/50 hover:text-on-surface px-4 py-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>
                  <button
                    onClick={() => {
                      const e = validateInfo();
                      if (Object.keys(e).length > 0) { setErrors(e); return; }
                      goTo(4);
                    }}
                    className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all duration-300 active:scale-95"
                  >
                    Напред <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Confirmation ──────────────────────────────────── */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-headline italic text-on-surface mb-8">Потвърдете записването</h2>

                <div className="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden mb-10">
                  {/* Booking header */}
                  <div className="bg-primary/5 border-b border-primary/10 px-8 py-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Избрана услуга</p>
                      <h3 className="text-2xl font-headline italic text-on-surface">{service?.name}</h3>
                    </div>
                    <span className="text-primary font-bold text-xl">{service?.price}</span>
                  </div>

                  <div className="p-8 space-y-0 divide-y divide-outline-variant/10">
                    {/* Date & Time */}
                    <SummaryRow icon={<Calendar className="w-4 h-4 text-primary" />} label="Дата">
                      {date ? fmtDateBG(date) : '—'}
                    </SummaryRow>
                    <SummaryRow icon={<Clock className="w-4 h-4 text-primary" />} label="Час">
                      {time ? `${time} ч.` : '—'}
                    </SummaryRow>
                    <SummaryRow icon={<span className="text-primary text-sm">🐾</span>} label="Продължителност">
                      {service?.duration}
                    </SummaryRow>

                    {/* Client */}
                    <div className="pt-4 pb-2">
                      <p className="text-xs uppercase tracking-widest text-on-surface/30 font-bold mb-3">Стопанин</p>
                      <div className="space-y-0 divide-y divide-outline-variant/5">
                        <SummaryRow label="Имена">{info.name}</SummaryRow>
                        <SummaryRow label="Телефон">{info.phone}</SummaryRow>
                        <SummaryRow label="Имейл">{info.email}</SummaryRow>
                      </div>
                    </div>

                    {/* Dog */}
                    <div className="pt-4 pb-2">
                      <p className="text-xs uppercase tracking-widest text-on-surface/30 font-bold mb-3">Куче</p>
                      <div className="space-y-0 divide-y divide-outline-variant/5">
                        <SummaryRow label="Кличка">{info.dogName}</SummaryRow>
                        {info.dogBreed && <SummaryRow label="Порода">{info.dogBreed}</SummaryRow>}
                        {info.notes    && <SummaryRow label="Бележки">{info.notes}</SummaryRow>}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-on-surface/40 text-sm mb-8 italic">
                  * Цената може да варира според размера и породата. Ще потвърдим точната сума при посещението.
                </p>

                <div className="flex justify-between">
                  <button onClick={() => goTo(3)} className="flex items-center gap-2 text-on-surface/50 hover:text-on-surface px-4 py-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="flex items-center gap-3 gold-gradient-btn text-on-primary px-10 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(230,195,100,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Потвърждаване...
                      </>
                    ) : (
                      <>Потвърди записването <CheckCircle className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return `w-full bg-surface-container-highest/30 border rounded-lg px-5 py-3.5 focus:outline-none transition-colors text-on-surface text-sm ${
    hasError ? 'border-red-500/60 focus:border-red-500' : 'border-outline-variant/20 focus:border-primary'
  }`;
}

function Field({ label, error, children, className = '' }: {
  label: string; error?: string; children: ReactNode; className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs uppercase tracking-widest text-on-surface/40 font-bold ml-1">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs ml-1">{error}</p>}
    </div>
  );
}

function SummaryRow({ icon, label, children }: { icon?: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 gap-4">
      <div className="flex items-center gap-2 shrink-0">
        {icon}
        <span className="text-on-surface/40 text-sm">{label}</span>
      </div>
      <span className="text-on-surface text-sm text-right">{children}</span>
    </div>
  );
}
