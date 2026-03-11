'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, Users, MapPin, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';
import { enUS } from 'date-fns/locale';

// --------------------------- Types & Constants ---------------------------
interface Location {
  id: number;
  name: string;
  address?: string;
}
interface MotiveOption { value: string; label: string; id: number; }

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(/^\d{8,}$/, 'Please enter a valid phone number.'),
  email: z.string().email('Invalid email address'),
});

export function BookingForm() {
  // --------------------------- State ---------------------------
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState<string>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState('2');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const hasAllSlotPrereqs = Boolean(locationId && date && guests);
  const [motive, setMotive] = useState<string | undefined>();
  const [motives, setMotives] = useState<MotiveOption[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Listen for reserve_now events to auto-select location
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      if (detail.locationId) {
        setLocationId(detail.locationId.toString());
      }
    };
    window.addEventListener('reserve_now', handler as EventListener);

    if (!locationId && typeof window !== 'undefined' && (window as any).__initialLocationId) {
      setLocationId((window as any).__initialLocationId.toString());
    }

    return () => window.removeEventListener('reserve_now', handler as EventListener);
  }, []);

  // --------------------------- Fetch Locations & Motives ---------------------------
  useEffect(() => {
    fetch('/api/booking/locations')
      .then(res => res.json())
      .then(json => {
        if (json.success) setLocations(json.locations || []);
      })
      .catch(() => console.error('No se pudieron obtener los locales'));
  }, []);

  useEffect(() => {
    fetch('/api/booking/motives')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          const fetched: MotiveOption[] = (json.motives || []).map((m: any) => ({
            id: m.id,
            value: m.value,
            label: m.value,
          }));
          setMotives(fetched);
        }
      })
      .catch(() => console.error('No se pudieron obtener los motivos'));
  }, []);

  // --------------------------- Fetch available slots ---------------------------
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

  useEffect(() => {
    if (!locationId || !date || !guests) {
      setAvailableSlots([]);
      return;
    }
    const bookingDate = date.toISOString().split('T')[0];

    setLoadingSlots(true);
    fetch(`/api/booking/slots-available?locationId=${locationId}&date=${bookingDate}&partySize=${guests}`)
      .then(res => {
        if (!res.ok) {
          setAvailableSlots([]);
          return res.json().then(() => ({}));
        }
        return res.json();
      })
      .then(json => {
        if (json.success && Array.isArray(json.slots)) {
          const slots: string[] = json.slots
            .filter((s: any) => s && (s.available !== false))
            .map((s: any) => {
              const t = typeof s.startTime === 'string' ? s.startTime : String(s);
              return t.substring(0, 5);
            })
            .filter((t: string) => /^\d{2}:\d{2}$/.test(t))
            .filter((t: string) => {
              const [h, m] = t.split(':').map(Number);
              const slotDate = new Date(date);
              slotDate.setHours(h, m, 0, 0);
              return slotDate > oneHourFromNow;
            });
          setAvailableSlots(slots);
          if (time && !slots.includes(time)) setTime(undefined);
        } else {
          setAvailableSlots([]);
        }
      })
      .catch(() => {
        console.error('No se pudieron obtener los horarios disponibles');
        setAvailableSlots([]);
      })
      .finally(() => setLoadingSlots(false));
  }, [locationId, date, guests]);

  // --------------------------- Helpers ---------------------------
  const validateField = (field: string, value: string) => {
    try {
      if (field === 'firstName') formSchema.shape.firstName.parse(value);
      else if (field === 'lastName') formSchema.shape.lastName.parse(value);
      else if (field === 'phone') formSchema.shape.phone.parse(value);
      else if (field === 'email') formSchema.shape.email.parse(value);
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: (error as z.ZodError).issues[0].message }));
      }
    }
  };

  // --------------------------- Submit ---------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse({ firstName, lastName, phone, email });
      setErrors({});
      setIsSubmitting(true);

      const bookingDate = date?.toISOString().split('T')[0];
      const payload = {
        customerName: firstName,
        customerLastName: lastName,
        phoneNumber: phone,
        email,
        locationId: Number(locationId),
        bookingDate,
        bookingTime: `${time}:00`,
        partySize: Number(guests),
        ...(motive ? { motive: Number(motive) } : {}),
        source: 'WEBSITE',
        specialRequests,
        companyIdentifier: 'Feriado Cantina',
      };

      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then(() => {
          const locName = locations.find(l => l.id.toString() === locationId)?.name || '';
          const formattedDate = date?.toLocaleDateString('es-AR', { month: 'long', day: 'numeric', year: 'numeric' });
          setModalType('success');
          setModalMessage(`Reserva confirmada para el ${formattedDate} a las ${time} en ${locName}.\nTe enviaremos los detalles por email. ¡Gracias!`);
          setShowModal(true);
          trackEvent('booking_confirmed', {
            locationId: Number(locationId),
            locationName: locName,
            bookingDate,
            bookingTime: time,
            partySize: Number(guests),
            motive,
          });
          if (typeof window !== 'undefined' && typeof window.gtag === 'function' && process.env.NEXT_PUBLIC_ADS_CONVERSION_ID && process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL) {
            window.gtag('event', 'conversion', {
              send_to: `${process.env.NEXT_PUBLIC_ADS_CONVERSION_ID}/${process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL}`,
            });
          }
          setFirstName('');
          setLastName('');
          setPhone('');
          setEmail('');
          setDate(undefined);
          setTime(undefined);
          setGuests('2');
          setLocationId(undefined);
          setMotive(undefined);
          setSpecialRequests('');
        })
        .catch(() => {
          setModalType('error');
          setModalMessage('Hubo un error al enviar tu reserva. Por favor, intentá de nuevo.');
          setShowModal(true);
        })
        .finally(() => setIsSubmitting(false));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        (error as z.ZodError).issues.forEach(err => {
          if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  // --------------------------- Render ---------------------------
  const selectedLocation = locations.find(l => l.id.toString() === locationId);

  return (
    <div className="max-w-lg mx-auto w-full text-base">
      <div className="bg-feriado-cream rounded-lg p-7 md:p-8 shadow-lg border border-gray-200/80">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2 text-foreground">Reservá tu mesa</h3>
          <p className="text-muted-foreground text-base md:text-lg">Completá tus datos y viví la experiencia Feriado</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="md:col-span-2">
              <Select value={locationId} onValueChange={setLocationId}>
                <SelectTrigger className="w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg">
                  {selectedLocation ? (
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-feriado-red" />
                      {selectedLocation.name}
                    </div>
                  ) : (
                    <SelectValue placeholder="Seleccionar ubicación" />
                  )}
                </SelectTrigger>
                <SelectContent className="bg-feriado-cream border border-gray-200 max-h-60 overflow-y-auto text-base">
                  {locations.map(loc => (
                    <SelectItem key={loc.id} value={loc.id.toString()} textValue={loc.name} className="hover:bg-accent/10 focus:bg-accent/10 text-foreground text-base data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent data-[state=checked]:bg-accent/10 data-[state=checked]:text-accent">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-feriado-red" />
                          {loc.name}
                        </div>
                        {loc.address && (
                          <span className="text-sm text-muted-foreground ml-7">{loc.address}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* First & Last Name */}
            <Input
              type="text"
              placeholder="Nombre *"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                validateField('firstName', e.target.value);
              }}
              className={`w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg placeholder:text-muted-foreground ${errors.firstName ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              placeholder="Apellido *"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
                validateField('lastName', e.target.value);
              }}
              className={`w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg placeholder:text-muted-foreground ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-400 text-base">{errors.firstName}</p>}
            {errors.lastName && <p className="text-red-400 text-base">{errors.lastName}</p>}

            {/* Phone */}
            <Input
              type="tel"
              placeholder="Teléfono *"
              value={phone}
              onChange={e => {
                const numeric = e.target.value.replace(/\D/g, '');
                setPhone(numeric);
                validateField('phone', numeric);
              }}
              className={`w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg placeholder:text-muted-foreground ${errors.phone ? 'border-red-500' : ''}`}
            />

            {/* Email */}
            <Input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                validateField('email', e.target.value);
              }}
              className={`w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg placeholder:text-muted-foreground md:col-span-1 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-400 text-base">{errors.phone}</p>}
            {errors.email && <p className="text-red-400 text-base md:col-span-2">{errors.email}</p>}

            {/* Guests */}
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg">
                <SelectValue placeholder="Comensales" />
              </SelectTrigger>
              <SelectContent className="bg-feriado-cream border border-gray-200 text-base">
                {Array.from({ length: 40 }, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()} className="hover:bg-accent/10 focus:bg-accent/10 text-foreground text-base data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent data-[state=checked]:bg-accent/10 data-[state=checked]:text-accent">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-feriado-red" />
                      {num} {num === 1 ? 'Persona' : 'Personas'}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Motive */}
            <Select value={motive} onValueChange={setMotive}>
              <SelectTrigger className="w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg">
                <SelectValue placeholder="Ocasión" />
              </SelectTrigger>
              <SelectContent className="bg-feriado-cream border border-gray-200 text-base">
                {motives.map(m => (
                  <SelectItem key={m.id} value={m.id.toString()} className="hover:bg-accent/10 focus:bg-accent/10 text-foreground text-base data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent data-[state=checked]:bg-accent/10 data-[state=checked]:text-accent">
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-teal-400" />
                      {m.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date selector */}
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-feriado-red" />
                {date ? date.toLocaleDateString('es-AR') : 'Fecha'}
              </Button>
              {showCalendar && (
                <div className="absolute top-full mt-2 z-50 min-w-[320px] w-fit bg-feriado-cream border border-gray-200 rounded-lg p-3 shadow-xl">
                  <Calendar
                    locale={enUS}
                    mode="single"
                    selected={date}
                    onSelect={d => {
                      setDate(d);
                      setShowCalendar(false);
                      if (time && d) {
                        const [h, m] = time.split(':').map(Number);
                        const slotDate = new Date(d);
                        slotDate.setHours(h, m);
                        if (slotDate <= oneHourFromNow) setTime(undefined);
                      }
                    }}
                    disabled={d => {
                      const start = new Date(d);
                      start.setHours(0, 0, 0, 0);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return start < today;
                    }}
                  />
                </div>
              )}
            </div>

            {/* Time selector */}
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full bg-feriado-cream border border-gray-200 rounded-lg h-12 text-foreground text-base md:text-lg">
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent className="bg-feriado-cream border border-gray-200 text-base">
                {loadingSlots && (
                  <SelectItem value="loading" disabled className="text-muted-foreground text-base">Cargando...</SelectItem>
                )}
                {!loadingSlots && availableSlots.map(slot => (
                  <SelectItem key={slot} value={slot} className="hover:bg-accent/10 focus:bg-accent/10 text-foreground text-base data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent data-[state=checked]:bg-accent/10 data-[state=checked]:text-accent">{slot}</SelectItem>
                ))}
                {!loadingSlots && availableSlots.length === 0 && (
                  <SelectItem value="none" disabled className="text-muted-foreground text-base">
                    {hasAllSlotPrereqs ? (
                      <span className="block text-left">
                        <span className="block">No hay horarios disponibles para ese grupo</span>
                        <span className="block">en esta ubicación para esta fecha.</span>
                      </span>
                    ) : (
                      'Seleccioná ubicación, fecha y comensales para ver horarios'
                    )}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Special Requests */}
            <Textarea
              placeholder="Pedidos especiales o comentarios"
              value={specialRequests}
              onChange={e => setSpecialRequests(e.target.value)}
              className="w-full bg-feriado-cream border border-gray-200 rounded-lg md:col-span-2 text-foreground min-h-[100px] text-base md:text-lg placeholder:text-muted-foreground"
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 text-base md:text-lg font-semibold md:col-span-2 disabled:opacity-50"
              disabled={!locationId || !firstName || !lastName || !phone || !email || !date || !time || !motive || isSubmitting}
            >
              {isSubmitting ? 'ENVIANDO...' : 'Confirmar reserva'}
            </Button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-feriado-cream border-gray-200 text-foreground rounded-lg text-base [&>button]:text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground text-xl font-bold">
              {modalType === 'success'
                ? <><CheckCircle className="h-6 w-6 text-feriado-blue" />Reserva Confirmada</>
                : <><XCircle className="h-6 w-6 text-feriado-red" />Error</>
              }
            </DialogTitle>
            <DialogDescription className="text-foreground mt-3 text-base md:text-lg">{modalMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setShowModal(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg text-base font-medium"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
