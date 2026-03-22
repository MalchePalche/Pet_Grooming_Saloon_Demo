import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    service: 'Пълно грумиране',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Полето за имена е задължително.';
    if (!form.email.trim()) {
      errs.email = 'Полето за имейл е задължително.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Въведете валиден имейл адрес.';
    }
    if (!form.message.trim()) errs.message = 'Полето за съобщение е задължително.';
    return errs;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 inline-block">КОНТАКТИ</span>
          <h1 className="text-6xl md:text-8xl font-headline italic mb-8">Свържете се с нас.</h1>
          <p className="text-on-surface/60 max-w-xl text-lg font-light">
            Имате въпроси или искате да запишете час? Свържете се с нас чрез формата по-долу или ни посетете на място.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
        {/* Contact Info */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <MapPin className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-primary uppercase text-xs font-bold tracking-widest mb-2">Адрес</h4>
                <p className="text-xl text-on-surface">гр. София, ул. "Любимец" 12</p>
                <p className="text-on-surface/40 text-sm mt-1">Район Лозенец</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Phone className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-primary uppercase text-xs font-bold tracking-widest mb-2">Телефон</h4>
                <a href="tel:+359888123456" className="text-xl text-on-surface hover:text-primary transition-colors">+359 888 123 456</a>
                <p className="text-on-surface/40 text-sm mt-1">Пон - Съб: 09:00 - 19:00</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-primary uppercase text-xs font-bold tracking-widest mb-2">Имейл</h4>
                <a href="mailto:hello@vashiyatbiznes.bg" className="text-xl text-on-surface hover:text-primary transition-colors">hello@vashiyatbiznes.bg</a>
                <p className="text-on-surface/40 text-sm mt-1">Отговаряме до 24 часа</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant/20">
            <h4 className="text-on-surface font-headline italic text-2xl mb-6">Последвайте ни</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-surface-container-low p-10 md:p-16 rounded-2xl border border-outline-variant/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {submitted ? (
            <motion.div
              className="flex flex-col items-center justify-center text-center h-full py-16 space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="w-16 h-16 text-primary" />
              <h3 className="text-3xl font-headline italic text-on-surface">Съобщението е изпратено!</h3>
              <p className="text-on-surface/60 max-w-sm">
                Благодарим Ви! Ще се свържем с Вас в рамките на 24 часа.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: 'Пълно грумиране', message: '' }); }}
                className="mt-4 border border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                Изпратете ново съобщение
              </button>
            </motion.div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-on-surface/40 font-bold ml-1">Три имена</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className={`w-full bg-surface-container-highest/30 border rounded-lg px-6 py-4 focus:outline-none transition-colors text-on-surface ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-outline-variant/20 focus:border-primary'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs ml-1 mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-on-surface/40 font-bold ml-1">Имейл адрес</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full bg-surface-container-highest/30 border rounded-lg px-6 py-4 focus:outline-none transition-colors text-on-surface ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-outline-variant/20 focus:border-primary'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs ml-1 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface/40 font-bold ml-1">Интересуваща услуга</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest/30 border border-outline-variant/20 rounded-lg px-6 py-4 focus:border-primary focus:outline-none transition-colors text-on-surface appearance-none cursor-pointer"
                >
                  <option>Пълно грумиране</option>
                  <option>Баня & Изсушаване</option>
                  <option>Само стайлинг</option>
                  <option>Нокти & Уши</option>
                  <option>СПА Третиране</option>
                  <option>Абонаментен пакет</option>
                  <option>Друго</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface/40 font-bold ml-1">Съобщение</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Как можем да помогнем на Вас и Вашия любимец?"
                  className={`w-full bg-surface-container-highest/30 border rounded-lg px-6 py-4 focus:outline-none transition-colors text-on-surface resize-none ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-outline-variant/20 focus:border-primary'
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-400 text-xs ml-1 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gold-gradient-btn text-on-primary py-5 rounded-lg font-bold text-lg tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    ИЗПРАЩАНЕ...
                  </span>
                ) : (
                  <>ИЗПРАТИ СЪОБЩЕНИЕ <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Map Placeholder */}
      <section className="max-w-7xl mx-auto px-8 mt-32">
        <div className="w-full h-[450px] bg-surface-container-high rounded-2xl relative overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200"
            alt="Map placeholder"
            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-md p-8 rounded-2xl border border-primary/30 text-center shadow-2xl">
              <MapPin className="text-primary w-10 h-10 mx-auto mb-4" />
              <h4 className="text-2xl font-headline italic mb-2">Посетете нашия салон</h4>
              <p className="text-on-surface/60">гр. София, ул. "Любимец" 12</p>
              <a
                href="https://www.google.com/maps/search/Sofia+ul+Lubimets+12"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-1 hover:opacity-70 transition-opacity"
              >
                Отворете в Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
