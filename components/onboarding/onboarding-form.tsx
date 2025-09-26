'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/lib/hooks/use-translations';
import { cn } from '@/lib/utils';

type DurationUnit = 'minutes' | 'hours';
type CurrencyCode = 'TRY' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'AED' | 'SAR' | 'KWD' | 'QAR';

const DEFAULT_CURRENCY: CurrencyCode = 'USD';

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  durationUnit: DurationUnit;
  price: string;
  currency: CurrencyCode;
  brand: string;
  description: string;
}

interface SocialLinkItem {
  id: string;
  platform: string;
  handle: string;
}

interface HolidayEntry {
  id: string;
  country: string;
  dates: string[];
}

type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

interface DaySchedule {
  enabled: boolean;
  open: string;
  close: string;
}

interface OnboardingFormData {
  identity: {
    doctorName: string;
    assistantName: string;
    clinicName: string;
    specialties: string;
    primaryService: string;
  };
  brand: {
    characterStyle: string;
    otherCharacterStyle: string;
    tone: string;
    emojiUsage: number;
    emojiCustom: string;
  };
  services: {
    items: ServiceItem[];
  };
  operational: {
    schedule: Record<DayKey, DaySchedule>;
    closedDays: {
      saturday: boolean;
      sunday: boolean;
      publicHolidays: boolean;
      other: boolean;
      otherText: string;
    };
    location: string;
    mapsLink: string;
    publicHolidays: HolidayEntry[];
  };
  contact: {
    numbers: {
      landline: string;
      mobile: string;
      whatsapp: string;
    };
    whatsappLink: string;
    email: string;
    socials: SocialLinkItem[];
  };
  booking: {
    process: string;
    handover: string[];
    bookingTools: string[];
    consultationFlow: string[];
    handoverOther: string;
    bookingToolsOther: string;
    consultationOther: string;
  };
  policies: {
    paymentMethods: string[];
    specialRules: string;
    restrictedProducts: string;
  };
  languageCulture: {
    languages: string[];
    defaultLanguage: string;
    otherLanguage: string;
    honorifics: string;
    culturalTone: string;
  };
  channels: {
    aiAgentChannels: string[];
    aiAgentOther: string;
    website: boolean;
    websiteUrl: string;
    otherPlatforms: string[];
    otherPlatformsOther: string;
  };
}

const EMPTY_SERVICE: ServiceItem = {
  id: 'service-initial',
  name: '',
  duration: '',
  durationUnit: 'minutes',
  price: '',
  currency: DEFAULT_CURRENCY,
  brand: '',
  description: '',
};

const EMPTY_SOCIAL: SocialLinkItem = {
  id: 'social-initial',
  platform: 'instagram',
  handle: '',
};

const DEFAULT_HOLIDAY_ENTRY: HolidayEntry = {
  id: 'holiday-initial',
  country: 'local',
  dates: [],
};

const DEFAULT_SCHEDULE: Record<DayKey, DaySchedule> = {
  monday: { enabled: true, open: '09:00', close: '18:00' },
  tuesday: { enabled: true, open: '09:00', close: '18:00' },
  wednesday: { enabled: true, open: '09:00', close: '18:00' },
  thursday: { enabled: true, open: '09:00', close: '18:00' },
  friday: { enabled: true, open: '09:00', close: '18:00' },
  saturday: { enabled: false, open: '10:00', close: '16:00' },
  sunday: { enabled: false, open: '10:00', close: '14:00' },
};

const DEFAULT_FORM_DATA: OnboardingFormData = {
  identity: {
    doctorName: '',
    assistantName: '',
    clinicName: '',
    specialties: '',
    primaryService: '',
  },
  brand: {
    characterStyle: 'clinic-assistant',
    otherCharacterStyle: '',
    tone: 'polished',
    emojiUsage: 1,
    emojiCustom: '',
  },
  services: {
    items: [
      {
        ...EMPTY_SERVICE,
        id: 'service-1',
      },
    ],
  },
  operational: {
    schedule: DEFAULT_SCHEDULE,
    closedDays: {
      saturday: false,
      sunday: false,
      publicHolidays: true,
      other: false,
      otherText: '',
    },
    location: '',
    mapsLink: '',
    publicHolidays: [],
  },
  contact: {
    numbers: {
      landline: '',
      mobile: '',
      whatsapp: '',
    },
    whatsappLink: '',
    email: '',
    socials: [
      {
        ...EMPTY_SOCIAL,
        id: 'social-1',
      },
    ],
  },
  booking: {
    process: 'consultation-first',
    handover: [],
    bookingTools: [],
    consultationFlow: [],
    handoverOther: '',
    bookingToolsOther: '',
    consultationOther: '',
  },
  policies: {
    paymentMethods: [],
    specialRules: '',
    restrictedProducts: '',
  },
  languageCulture: {
    languages: ['turkish'],
    defaultLanguage: 'turkish',
    otherLanguage: '',
    honorifics: 'hanim-bey',
    culturalTone: 'formal',
  },
  channels: {
    aiAgentChannels: [],
    aiAgentOther: '',
    website: false,
    websiteUrl: '',
    otherPlatforms: [],
    otherPlatformsOther: '',
  },
};

const STORAGE_BASE_KEY = 'entagl-onboarding';

const DAYS: { key: DayKey; order: number }[] = [
  { key: 'monday', order: 1 },
  { key: 'tuesday', order: 2 },
  { key: 'wednesday', order: 3 },
  { key: 'thursday', order: 4 },
  { key: 'friday', order: 5 },
  { key: 'saturday', order: 6 },
  { key: 'sunday', order: 7 },
];

const EMOJI_SLIDER_VALUES = [0, 1, 2] as const;

const durationUnits: { value: DurationUnit; labelKey: string }[] = [
  { value: 'minutes', labelKey: 'onboarding.fields.duration.minutes' },
  { value: 'hours', labelKey: 'onboarding.fields.duration.hours' },
];

const currencyOptions: CurrencyCode[] = [
  'TRY',
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'AED',
  'SAR',
  'KWD',
  'QAR',
];

const socialPlatforms = [
  'instagram',
  'tiktok',
  'facebook',
  'website',
  'other',
];

const aiAgentChannels = [
  'whatsapp',
  'instagram-dm',
  'facebook-messenger',
  'telegram',
  'website-chat',
  'other',
];

const otherPlatforms = [
  'tiktok-dm',
  'email-automation',
  'sms',
  'other',
];

const bookingTools = ['request_booking', 'human_handover', 'other'];

const consultationOptions = ['free', 'photos-required', 'medical-questionnaire', 'other'];

const paymentMethods = [
  'visa',
  'mastercard',
  'amex',
  'cash',
  'paypal',
  'bank-transfer',
  'iban-transfer',
  'other',
];

const handoverOptions = ['pain', 'complaints', 'out-of-hours', 'other'];

const honorificOptions = ['hanim-bey', 'mr-ms', 'senor', 'none'];

const characterStyles = ['clinic-assistant'];

const toneOptions = ['polished', 'casual', 'professional'];

const availableLanguages = [
  'turkish',
  'english',
  'arabic',
  'russian',
  'spanish',
  'german',
  'french',
  'italian',
  'polish',
  'portuguese',
  'farsi',
  'other',
];

const holidayCountryOptions = [
  'local',
  'turkey',
  'usa',
  'canada',
  'uk',
  'uae',
  'saudi',
  'kuwait',
  'qatar',
  'other',
];

const isStringArray = (value: unknown[]): value is string[] =>
  value.every((item) => typeof item === 'string');

const createId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
};

export function OnboardingForm() {
  const { t } = useTranslations();
  const { toast } = useToast();

  const [formData, setFormData] = useState<OnboardingFormData>(DEFAULT_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [storageKey, setStorageKey] = useState<string>(STORAGE_BASE_KEY);
  const [userIp, setUserIp] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const hasHydratedRef = useRef(false);
  const formTopRef = useRef<HTMLDivElement>(null);

  const totalSteps = 9;

  // Fetch IP to customize storage key
  useEffect(() => {
    let ignore = false;
    if (typeof window === 'undefined') return;

    const detectIp = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (ignore) return;
        if (data?.ip) {
          setUserIp(data.ip);
          setStorageKey(`${STORAGE_BASE_KEY}-${data.ip}`);
        } else {
          setStorageKey(STORAGE_BASE_KEY);
        }
      } catch (error) {
        setStorageKey(STORAGE_BASE_KEY);
      }
    };

    detectIp();

    return () => {
      ignore = true;
    };
  }, []);

  // Hydrate state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) {
          const incoming = parsed.data as Partial<OnboardingFormData>;

          const mergedLanguageCulture = {
            ...DEFAULT_FORM_DATA.languageCulture,
            ...(incoming.languageCulture ?? {}),
          };

          if (!mergedLanguageCulture.defaultLanguage) {
            mergedLanguageCulture.defaultLanguage =
              DEFAULT_FORM_DATA.languageCulture.defaultLanguage;
          }

          if (
            !Array.isArray(mergedLanguageCulture.languages) ||
            mergedLanguageCulture.languages.length === 0
          ) {
            mergedLanguageCulture.languages = [mergedLanguageCulture.defaultLanguage];
          }

          if (!mergedLanguageCulture.languages.includes(mergedLanguageCulture.defaultLanguage)) {
            mergedLanguageCulture.defaultLanguage = mergedLanguageCulture.languages[0];
          }

          const incomingOperational = incoming.operational as
            | Partial<OnboardingFormData['operational']>
            | undefined;
          const mergedOperational = {
            ...DEFAULT_FORM_DATA.operational,
            ...(incomingOperational ?? {}),
          };

          const rawHolidays = incomingOperational?.publicHolidays;
          if (Array.isArray(rawHolidays)) {
            const rawArray = rawHolidays as unknown[];

            if (isStringArray(rawArray)) {
              const filtered = rawArray.filter((value) => value && value.length > 0);
              if (filtered.length > 0) {
                mergedOperational.publicHolidays = [
                  {
                    id: createId('holiday'),
                    country: 'local',
                    dates: filtered,
                  },
                ];
              }
            } else {
              const entryArray = rawArray.filter(
                (entry): entry is Partial<HolidayEntry> =>
                  typeof entry === 'object' && entry !== null
              );

              mergedOperational.publicHolidays = entryArray
                .map((entry) => ({
                  id: entry?.id ?? createId('holiday'),
                  country: entry?.country ?? 'local',
                  dates: Array.isArray(entry?.dates)
                    ? (entry.dates as unknown[]).filter(
                      (date): date is string => typeof date === 'string' && date.length > 0
                    )
                    : [],
                }))
                .filter((entry) => entry.dates.length > 0);
            }
          }

          const mergedBooking = {
            ...DEFAULT_FORM_DATA.booking,
            ...(incoming.booking ?? {}),
          };

          if (!Array.isArray(mergedBooking.handover)) {
            mergedBooking.handover = [];
          }
          if (!mergedBooking.handover.includes('other')) {
            mergedBooking.handoverOther = '';
          }

          if (!Array.isArray(mergedBooking.bookingTools)) {
            mergedBooking.bookingTools = [];
          }
          if (!mergedBooking.bookingTools.includes('other')) {
            mergedBooking.bookingToolsOther = '';
          }

          if (!Array.isArray(mergedBooking.consultationFlow)) {
            mergedBooking.consultationFlow = [];
          }
          if (!mergedBooking.consultationFlow.includes('other')) {
            mergedBooking.consultationOther = '';
          }

          const mergedChannels = {
            ...DEFAULT_FORM_DATA.channels,
            ...(incoming.channels ?? {}),
          };

          if (!Array.isArray(mergedChannels.aiAgentChannels)) {
            mergedChannels.aiAgentChannels = [];
          }
          if (!mergedChannels.aiAgentChannels.includes('other')) {
            mergedChannels.aiAgentOther = '';
          }

          if (!Array.isArray(mergedChannels.otherPlatforms)) {
            mergedChannels.otherPlatforms = [];
          }
          if (!mergedChannels.otherPlatforms.includes('other')) {
            mergedChannels.otherPlatformsOther = '';
          }

          // Handle specialties conversion from array to string for backward compatibility
          const mergedIdentity = {
            ...DEFAULT_FORM_DATA.identity,
            ...(incoming.identity ?? {}),
          };

          // Convert specialties from array to string if needed
          if (Array.isArray(mergedIdentity.specialties)) {
            mergedIdentity.specialties = (mergedIdentity.specialties as string[]).join(', ');
          } else if (typeof mergedIdentity.specialties !== 'string') {
            mergedIdentity.specialties = '';
          }

          setFormData({
            ...DEFAULT_FORM_DATA,
            ...incoming,
            identity: mergedIdentity,
            operational: mergedOperational,
            languageCulture: mergedLanguageCulture,
            booking: mergedBooking,
            channels: mergedChannels,
          } as OnboardingFormData);
        }
        if (typeof parsed?.step === 'number') {
          setCurrentStep(Math.min(Math.max(parsed.step, 0), totalSteps - 1));
        }
      }
    } catch (error) {
      console.warn('Failed to load onboarding draft', error);
    } finally {
      hasHydratedRef.current = true;
      setIsInitializing(false);
    }
  }, [storageKey, totalSteps]);

  // Persist state to localStorage
  useEffect(() => {
    if (!hasHydratedRef.current || typeof window === 'undefined') return;

    try {
      const payload = JSON.stringify({ data: formData, step: currentStep, ip: userIp });
      localStorage.setItem(storageKey, payload);
    } catch (error) {
      console.warn('Failed to persist onboarding draft', error);
    }
  }, [formData, currentStep, storageKey, userIp]);

  // Auto-scroll to top when step changes
  useEffect(() => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentStep]);

  const stepTitles = useMemo(
    () => [
      t('onboarding.steps.identity.title'),
      t('onboarding.steps.brand.title'),
      t('onboarding.steps.services.title'),
      t('onboarding.steps.operational.title'),
      t('onboarding.steps.contact.title'),
      t('onboarding.steps.booking.title'),
      t('onboarding.steps.policies.title'),
      t('onboarding.steps.languageCulture.title'),
      t('onboarding.steps.channels.title'),
    ],
    [t]
  );



  const updateServiceItem = (id: string, updates: Partial<ServiceItem>) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((item) =>
          item.id === id
            ? {
              ...item,
              ...updates,
            }
            : item
        ),
      },
    }));
  };

  const addServiceItem = () => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [
          ...prev.services.items,
          {
            ...EMPTY_SERVICE,
            id: createId('service'),
          },
        ],
      },
    }));
  };

  const removeServiceItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((item) => item.id !== id),
      },
    }));
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLinkItem>) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: prev.contact.socials.map((item) =>
          item.id === id
            ? {
              ...item,
              ...updates,
            }
            : item
        ),
      },
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: [
          ...prev.contact.socials,
          {
            ...EMPTY_SOCIAL,
            id: createId('social'),
          },
        ],
      },
    }));
  };

  const removeSocialLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: prev.contact.socials.filter((item) => item.id !== id),
      },
    }));
  };

  const addHolidayEntry = () => {
    setFormData((prev) => ({
      ...prev,
      operational: {
        ...prev.operational,
        publicHolidays: [
          ...prev.operational.publicHolidays,
          {
            ...DEFAULT_HOLIDAY_ENTRY,
            id: createId('holiday'),
          },
        ],
      },
    }));
  };

  const updateHolidayEntry = (id: string, updates: Partial<HolidayEntry>) => {
    setFormData((prev) => ({
      ...prev,
      operational: {
        ...prev.operational,
        publicHolidays: prev.operational.publicHolidays.map((entry) =>
          entry.id === id
            ? {
              ...entry,
              ...updates,
            }
            : entry
        ),
      },
    }));
  };

  const removeHolidayEntry = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      operational: {
        ...prev.operational,
        publicHolidays: prev.operational.publicHolidays.filter((entry) => entry.id !== id),
      },
    }));
  };

  const toggleArrayValue = (values: string[], value: string) => {
    if (values.includes(value)) {
      return values.filter((item) => item !== value);
    }
    return [...values, value];
  };

  const handleLanguageToggle = (value: string) => {
    setFormData((prev) => {
      const currentLanguages = prev.languageCulture.languages;
      const isSelected = currentLanguages.includes(value);

      if (isSelected && currentLanguages.length === 1) {
        return prev;
      }

      let nextLanguages = isSelected
        ? currentLanguages.filter((lang) => lang !== value)
        : [...currentLanguages, value];

      if (nextLanguages.length === 0) {
        nextLanguages = [value];
      }

      let nextDefault = prev.languageCulture.defaultLanguage;
      if (!nextLanguages.includes(nextDefault)) {
        nextDefault = nextLanguages[0];
      }

      const nextOther = nextLanguages.includes('other') ? prev.languageCulture.otherLanguage : '';

      return {
        ...prev,
        languageCulture: {
          ...prev.languageCulture,
          languages: nextLanguages,
          defaultLanguage: nextDefault,
          otherLanguage: nextOther,
        },
      };
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Identity step
        return (
          formData.identity.doctorName.trim() !== '' &&
          formData.identity.assistantName.trim() !== '' &&
          formData.identity.clinicName.trim() !== '' &&
          formData.identity.specialties.trim() !== ''
        );
      case 1: // Brand step - tone guidelines mandatory
        return formData.brand.tone !== '';
      case 2: // Services step - at least 1 service with name, amount, duration
        return formData.services.items.some(
          (service) =>
            service.name.trim() !== '' &&
            service.price.trim() !== '' &&
            service.duration.trim() !== ''
        );
      case 4: // Contact step - mobile and email mandatory
        return (
          formData.contact.numbers.mobile.trim() !== '' &&
          formData.contact.email.trim() !== ''
        );
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    // Final validation before submission
    const isValid =
      formData.identity.doctorName.trim() !== '' &&
      formData.identity.assistantName.trim() !== '' &&
      formData.identity.clinicName.trim() !== '' &&
      formData.identity.specialties.trim() !== '' &&
      formData.brand.tone !== '' &&
      formData.services.items.some(
        (service) =>
          service.name.trim() !== '' &&
          service.price.trim() !== '' &&
          service.duration.trim() !== ''
      ) &&
      formData.contact.numbers.mobile.trim() !== '' &&
      formData.contact.email.trim() !== '';

    if (!isValid) {
      toast({
        title: t('onboarding.toast.validation.title'),
        description: t('onboarding.toast.validation.description'),
      });
      return;
    }

    setIsSubmitting(true);

    const sanitizedChannels = {
      ...formData.channels,
      aiAgentOther: formData.channels.aiAgentChannels.includes('other')
        ? formData.channels.aiAgentOther
        : '',
      otherPlatformsOther: formData.channels.otherPlatforms.includes('other')
        ? formData.channels.otherPlatformsOther
        : '',
    };

    const payload = {
      ...formData,
      contact: {
        ...formData.contact,
        whatsappLink:
          formData.contact.whatsappLink ||
          (formData.contact.numbers.whatsapp
            ? `https://wa.me/${formData.contact.numbers.whatsapp.replace(/\D/g, '')}`
            : ''),
      },
      operational: {
        ...formData.operational,
        publicHolidays: formData.operational.publicHolidays.filter(
          (entry) => entry.dates.length > 0
        ),
      },
      channels: sanitizedChannels,
      metadata: {
        ip: userIp,
        submittedAt: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch(
        'https://hook.us1.make.com/7cyf5ovrrp4jfmea0s946qb9f740jlh6',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      toast({
        title: t('onboarding.toast.success.title'),
        description: t('onboarding.toast.success.description'),
      });

      setFormData(DEFAULT_FORM_DATA);
      setCurrentStep(0);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error('Failed to submit onboarding form', error);
      toast({
        title: t('onboarding.toast.error.title'),
        description: t('onboarding.toast.error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepCard
            title={t('onboarding.steps.identity.title')}
            description={t('onboarding.steps.identity.description')}
          >
            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="doctor-name" className="text-sm font-medium">
                  {t('onboarding.steps.identity.fields.doctorName')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="doctor-name"
                  value={formData.identity.doctorName}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        doctorName: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.identity.placeholders.doctorName')}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assistant-name" className="text-sm font-medium">
                  {t('onboarding.steps.identity.fields.assistantName')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="assistant-name"
                  value={formData.identity.assistantName}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        assistantName: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.identity.placeholders.assistantName')}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clinic-name" className="text-sm font-medium">
                  {t('onboarding.steps.identity.fields.clinicName')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="clinic-name"
                  value={formData.identity.clinicName}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        clinicName: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.identity.placeholders.clinicName')}
                  className="min-h-[44px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="specialties" className="text-sm font-medium">
                  {t('onboarding.steps.identity.fields.specialties')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="specialties"
                  value={formData.identity.specialties}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        specialties: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.identity.placeholders.specialties')}
                  className="min-h-[44px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="primary-service" className="text-sm font-medium">
                  {t('onboarding.steps.identity.fields.primaryService')}
                </Label>
                <Input
                  id="primary-service"
                  value={formData.identity.primaryService}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: {
                        ...prev.identity,
                        primaryService: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.identity.placeholders.primaryService')}
                  className="min-h-[44px]"
                />
              </div>
            </div>
          </StepCard>
        );
      case 1:
        return (
          <StepCard
            title={t('onboarding.steps.brand.title')}
            description={t('onboarding.steps.brand.description')}
          >
            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-3">
                <Label className="text-sm font-medium">
                  {t('onboarding.steps.brand.fields.characterStyle')}
                </Label>
                <Select
                  value={formData.brand.characterStyle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      brand: {
                        ...prev.brand,
                        characterStyle: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder={t('onboarding.steps.brand.placeholders.characterStyle')} />
                  </SelectTrigger>
                  <SelectContent>
                    {characterStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {t(`onboarding.steps.brand.options.characterStyle.${style}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.brand.characterStyle === 'other' && (
                  <Input
                    value={formData.brand.otherCharacterStyle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        brand: {
                          ...prev.brand,
                          otherCharacterStyle: event.target.value,
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.brand.placeholders.otherCharacterStyle')}
                    className="min-h-[44px]"
                  />
                )}
              </div>

              <div className="grid gap-3">
                <Label className="text-sm font-medium">
                  {t('onboarding.steps.brand.fields.tone')} <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.brand.tone}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      brand: {
                        ...prev.brand,
                        tone: value,
                      },
                    }))
                  }
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {toneOptions.map((tone) => (
                    <Label
                      key={tone}
                      className={cn(
                        'flex cursor-pointer flex-col gap-2 rounded-lg border p-3 sm:p-4 min-h-[44px] transition-colors',
                        formData.brand.tone === tone && 'border-primary bg-primary/5'
                      )}
                    >
                      <RadioGroupItem value={tone} className="sr-only" />
                      <span className="font-medium text-sm sm:text-base">
                        {t(`onboarding.steps.brand.options.tone.${tone}`)}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {t(`onboarding.steps.brand.options.toneDescriptions.${tone}`)}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <Label>{t('onboarding.steps.brand.fields.emojiUsage')}</Label>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={2}
                    step={1}
                    value={[formData.brand.emojiUsage]}
                    onValueChange={(values) =>
                      setFormData((prev) => ({
                        ...prev,
                        brand: {
                          ...prev.brand,
                          emojiUsage: values[0] ?? 1,
                        },
                      }))
                    }
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    {EMOJI_SLIDER_VALUES.map((value) => (
                      <span
                        key={value}
                        className={cn(
                          'font-medium',
                          formData.brand.emojiUsage === value && 'text-foreground'
                        )}
                      >
                        {t(`onboarding.steps.brand.options.emojiUsage.${value}`)}
                      </span>
                    ))}
                  </div>
                </div>
                <Textarea
                  value={formData.brand.emojiCustom}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      brand: {
                        ...prev.brand,
                        emojiCustom: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.brand.placeholders.emojiCustom')}
                />
              </div>
            </div>
          </StepCard>
        );
      case 2:
        return (
          <StepCard
            title={t('onboarding.steps.services.title')}
            description={t('onboarding.steps.services.description')}
          >
            <div className="grid gap-6">
              <ScrollArea className="max-h-[500px] pr-4">
                <div className="grid gap-6">
                  {formData.services.items.map((service, index) => (
                    <div key={service.id} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold">
                            {t('onboarding.steps.services.labels.service')} #{index + 1}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t('onboarding.steps.services.labels.serviceHint')}
                          </p>
                        </div>
                        {formData.services.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeServiceItem(service.id)}
                            className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label className="text-sm font-medium">
                            {t('onboarding.steps.services.fields.name')} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={service.name}
                            onChange={(event) =>
                              updateServiceItem(service.id, { name: event.target.value })
                            }
                            placeholder={t('onboarding.steps.services.placeholders.name')}
                            className="min-h-[44px]"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm font-medium">
                            {t('onboarding.steps.services.fields.duration')} <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              type="number"
                              min={0}
                              value={service.duration}
                              onChange={(event) =>
                                updateServiceItem(service.id, { duration: event.target.value })
                              }
                              placeholder={t('onboarding.steps.services.placeholders.duration')}
                              className="min-h-[44px] flex-1"
                              required
                            />
                            <Select
                              value={service.durationUnit}
                              onValueChange={(value: DurationUnit) =>
                                updateServiceItem(service.id, { durationUnit: value })
                              }
                            >
                              <SelectTrigger className="w-full sm:w-[140px] min-h-[44px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {durationUnits.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {t(option.labelKey)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm font-medium">
                            {t('onboarding.steps.services.fields.price')} <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              type="number"
                              min={0}
                              value={service.price}
                              onChange={(event) =>
                                updateServiceItem(service.id, { price: event.target.value })
                              }
                              placeholder={t('onboarding.steps.services.placeholders.price')}
                              className="min-h-[44px] flex-1"
                              required
                            />
                            <Select
                              value={service.currency}
                              onValueChange={(value: CurrencyCode) =>
                                updateServiceItem(service.id, { currency: value })
                              }
                            >
                              <SelectTrigger className="w-full sm:w-[140px] min-h-[44px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {currencyOptions.map((currency) => (
                                  <SelectItem key={currency} value={currency}>
                                    {currency}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm font-medium">
                            {t('onboarding.steps.services.fields.brand')} <span className="text-muted-foreground text-xs">(optional)</span>
                          </Label>
                          <Input
                            value={service.brand}
                            onChange={(event) =>
                              updateServiceItem(service.id, { brand: event.target.value })
                            }
                            placeholder={t('onboarding.steps.services.placeholders.brand')}
                            className="min-h-[44px]"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-sm font-medium">
                          {t('onboarding.steps.services.fields.description')} <span className="text-muted-foreground text-xs">(optional)</span>
                        </Label>
                        <Textarea
                          value={service.description}
                          onChange={(event) =>
                            updateServiceItem(service.id, { description: event.target.value })
                          }
                          placeholder={t('onboarding.steps.services.placeholders.description')}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button
                type="button"
                onClick={addServiceItem}
                className="w-full sm:w-auto min-h-[44px]"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('onboarding.buttons.addService')}
              </Button>
            </div>
          </StepCard>
        );
      case 3:
        return (
          <StepCard
            title={t('onboarding.steps.operational.title')}
            description={t('onboarding.steps.operational.description')}
          >
            <div className="grid gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t('onboarding.steps.operational.fields.schedule')}</Label>
                  <span className="text-sm text-muted-foreground">
                    {t('onboarding.steps.operational.hints.schedule')}
                  </span>
                </div>
                <div className="grid gap-3">
                  {DAYS.map((day) => (
                    <div
                      key={day.key}
                      className="grid gap-4 rounded-lg border p-4 md:grid-cols-[120px_1fr]"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${day.key}-enabled`}
                          checked={formData.operational.schedule[day.key].enabled}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              operational: {
                                ...prev.operational,
                                schedule: {
                                  ...prev.operational.schedule,
                                  [day.key]: {
                                    ...prev.operational.schedule[day.key],
                                    enabled: Boolean(checked),
                                  },
                                },
                              },
                            }))
                          }
                        />
                        <Label htmlFor={`${day.key}-enabled`} className="capitalize">
                          {t(`onboarding.steps.operational.days.${day.key}`)}
                        </Label>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2 md:items-center">
                        <div className="grid gap-1">
                          <Label htmlFor={`${day.key}-open`} className="text-xs uppercase text-muted-foreground">
                            {t('onboarding.steps.operational.fields.open')}
                          </Label>
                          <Input
                            id={`${day.key}-open`}
                            type="time"
                            value={formData.operational.schedule[day.key].open}
                            onChange={(event) =>
                              setFormData((prev) => ({
                                ...prev,
                                operational: {
                                  ...prev.operational,
                                  schedule: {
                                    ...prev.operational.schedule,
                                    [day.key]: {
                                      ...prev.operational.schedule[day.key],
                                      open: event.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            disabled={!formData.operational.schedule[day.key].enabled}
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor={`${day.key}-close`} className="text-xs uppercase text-muted-foreground">
                            {t('onboarding.steps.operational.fields.close')}
                          </Label>
                          <Input
                            id={`${day.key}-close`}
                            type="time"
                            value={formData.operational.schedule[day.key].close}
                            onChange={(event) =>
                              setFormData((prev) => ({
                                ...prev,
                                operational: {
                                  ...prev.operational,
                                  schedule: {
                                    ...prev.operational.schedule,
                                    [day.key]: {
                                      ...prev.operational.schedule[day.key],
                                      close: event.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            disabled={!formData.operational.schedule[day.key].enabled}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <Label>{t('onboarding.steps.operational.fields.closedDays')}</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <CheckboxRow
                    id="closed-saturday"
                    checked={formData.operational.closedDays.saturday}
                    label={t('onboarding.steps.operational.options.closedDays.saturday')}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          closedDays: {
                            ...prev.operational.closedDays,
                            saturday: Boolean(checked),
                          },
                        },
                      }))
                    }
                  />
                  <CheckboxRow
                    id="closed-sunday"
                    checked={formData.operational.closedDays.sunday}
                    label={t('onboarding.steps.operational.options.closedDays.sunday')}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          closedDays: {
                            ...prev.operational.closedDays,
                            sunday: Boolean(checked),
                          },
                        },
                      }))
                    }
                  />
                  <CheckboxRow
                    id="closed-holidays"
                    checked={formData.operational.closedDays.publicHolidays}
                    label={t('onboarding.steps.operational.options.closedDays.publicHolidays')}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          closedDays: {
                            ...prev.operational.closedDays,
                            publicHolidays: Boolean(checked),
                          },
                        },
                      }))
                    }
                  />
                  <CheckboxRow
                    id="closed-other"
                    checked={formData.operational.closedDays.other}
                    label={t('onboarding.steps.operational.options.closedDays.other')}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          closedDays: {
                            ...prev.operational.closedDays,
                            other: Boolean(checked),
                          },
                        },
                      }))
                    }
                  />
                </div>
                {formData.operational.closedDays.other && (
                  <Input
                    value={formData.operational.closedDays.otherText}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          closedDays: {
                            ...prev.operational.closedDays,
                            otherText: event.target.value,
                          },
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.operational.placeholders.closedOther')}
                  />
                )}
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="clinic-location">{t('onboarding.steps.operational.fields.location')}</Label>
                  <Input
                    id="clinic-location"
                    value={formData.operational.location}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          location: event.target.value,
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.operational.placeholders.location')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maps-link">{t('onboarding.steps.operational.fields.mapsLink')}</Label>
                  <Input
                    id="maps-link"
                    type="url"
                    value={formData.operational.mapsLink}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        operational: {
                          ...prev.operational,
                          mapsLink: event.target.value,
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.operational.placeholders.mapsLink')}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    {t('onboarding.steps.operational.fields.publicHolidays')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('onboarding.steps.operational.hints.publicHolidays')}
                  </p>
                </div>

                {formData.operational.publicHolidays.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    {t('onboarding.steps.operational.emptyState.publicHolidays')}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {formData.operational.publicHolidays.map((holiday) => (
                      <div key={holiday.id} className="space-y-3 rounded-lg border p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <Label className="text-sm font-medium">
                              {t('onboarding.steps.operational.labels.holidayCountry')}
                            </Label>
                            <Select
                              value={holiday.country}
                              onValueChange={(value) => updateHolidayEntry(holiday.id, { country: value })}
                            >
                              <SelectTrigger className="min-h-[44px]">
                                <SelectValue placeholder={t('onboarding.steps.operational.placeholders.holidayCountry')} />
                              </SelectTrigger>
                              <SelectContent>
                                {holidayCountryOptions.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {t(`onboarding.steps.operational.options.holidayCountries.${country}`)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="self-start md:self-center"
                            onClick={() => removeHolidayEntry(holiday.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            {t('onboarding.steps.operational.labels.holidayDates')}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  'justify-start text-left font-normal',
                                  holiday.dates.length === 0 && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {holiday.dates.length
                                  ? holiday.dates
                                    .map((dateString) => format(new Date(dateString), 'PPP'))
                                    .join(', ')
                                  : t('onboarding.steps.operational.placeholders.holidayDates')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="multiple"
                                selected={holiday.dates.map((dateString) => new Date(dateString))}
                                onSelect={(dates) =>
                                  updateHolidayEntry(holiday.id, {
                                    dates: dates?.map((date) => date.toISOString()) ?? [],
                                  })
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button type="button" variant="outline" onClick={addHolidayEntry}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('onboarding.buttons.addHoliday')}
                </Button>
              </div>
            </div>
          </StepCard>
        );
      case 4:
        return (
          <StepCard
            title={t('onboarding.steps.contact.title')}
            description={t('onboarding.steps.contact.description')}
          >
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="phone-landline">{t('onboarding.steps.contact.fields.landline')}</Label>
                  <Input
                    id="phone-landline"
                    value={formData.contact.numbers.landline}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          numbers: {
                            ...prev.contact.numbers,
                            landline: event.target.value,
                          },
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.contact.placeholders.landline')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-mobile" className="text-sm font-medium">
                    {t('onboarding.steps.contact.fields.mobile')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone-mobile"
                    value={formData.contact.numbers.mobile}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          numbers: {
                            ...prev.contact.numbers,
                            mobile: event.target.value,
                          },
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.contact.placeholders.mobile')}
                    className="min-h-[44px]"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-whatsapp">{t('onboarding.steps.contact.fields.whatsapp')}</Label>
                  <Input
                    id="phone-whatsapp"
                    value={formData.contact.numbers.whatsapp}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          numbers: {
                            ...prev.contact.numbers,
                            whatsapp: event.target.value,
                          },
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.contact.placeholders.whatsapp')}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatsapp-link">{t('onboarding.steps.contact.fields.whatsappLink')}</Label>
                <Input
                  id="whatsapp-link"
                  type="url"
                  value={formData.contact.whatsappLink}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        whatsappLink: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.contact.placeholders.whatsappLink')}
                />
                <p className="text-xs text-muted-foreground">
                  {t('onboarding.steps.contact.hints.whatsappLink')}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('onboarding.steps.contact.fields.email')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact.email}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        email: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.contact.placeholders.email')}
                  className="min-h-[44px]"
                  required
                />
              </div>

              <div className="grid gap-4">
                <Label>{t('onboarding.steps.contact.fields.socials')}</Label>
                <div className="grid gap-4">
                  {formData.contact.socials.map((social) => (
                    <div key={social.id} className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1fr_auto]">
                      <Select
                        value={social.platform}
                        onValueChange={(value) =>
                          updateSocialLink(social.id, { platform: value })
                        }
                      >
                        <SelectTrigger className="min-h-[44px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {socialPlatforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {t(`onboarding.steps.contact.options.platforms.${platform}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        value={social.handle}
                        onChange={(event) =>
                          updateSocialLink(social.id, { handle: event.target.value })
                        }
                        placeholder={t('onboarding.steps.contact.placeholders.socialHandle')}
                      />

                      <div className="flex items-center justify-end">
                        {formData.contact.socials.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocialLink(social.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button type="button" onClick={addSocialLink}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('onboarding.buttons.addSocialLink')}
                </Button>
              </div>
            </div>
          </StepCard>
        );
      case 5:
        return (
          <StepCard
            title={t('onboarding.steps.booking.title')}
            description={t('onboarding.steps.booking.description')}
          >
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label>{t('onboarding.steps.booking.fields.process')}</Label>
                <RadioGroup
                  value={formData.booking.process}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      booking: {
                        ...prev.booking,
                        process: value,
                      },
                    }))
                  }
                  className="grid gap-3 md:grid-cols-3"
                >
                  {['consultation-first', 'same-day', 'both'].map((option) => (
                    <Label
                      key={option}
                      className={cn(
                        'flex cursor-pointer flex-col gap-2 rounded-lg border p-4',
                        formData.booking.process === option && 'border-primary bg-primary/5'
                      )}
                    >
                      <RadioGroupItem value={option} className="sr-only" />
                      <span className="font-medium">
                        {t(`onboarding.steps.booking.options.process.${option}`)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t(`onboarding.steps.booking.options.processDescriptions.${option}`)}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <CheckboxGroup
                title={t('onboarding.steps.booking.fields.handover')}
                description={t('onboarding.steps.booking.hints.handover')}
                options={handoverOptions}
                values={formData.booking.handover}
                onToggle={(value) =>
                  setFormData((prev) => {
                    const nextValues = toggleArrayValue(prev.booking.handover, value);
                    return {
                      ...prev,
                      booking: {
                        ...prev.booking,
                        handover: nextValues,
                        handoverOther:
                          value === 'other' && !nextValues.includes('other')
                            ? ''
                            : prev.booking.handoverOther,
                      },
                    };
                  })
                }
                t={t}
                translationPrefix="onboarding.steps.booking.options.handover"
              />

              {formData.booking.handover.includes('other') && (
                <Textarea
                  value={formData.booking.handoverOther}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      booking: {
                        ...prev.booking,
                        handoverOther: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.booking.placeholders.handoverOther')}
                  rows={3}
                />
              )}

              <CheckboxGroup
                title={t('onboarding.steps.booking.fields.bookingTools')}
                description={t('onboarding.steps.booking.hints.bookingTools')}
                options={bookingTools}
                values={formData.booking.bookingTools}
                onToggle={(value) =>
                  setFormData((prev) => {
                    const nextValues = toggleArrayValue(prev.booking.bookingTools, value);
                    return {
                      ...prev,
                      booking: {
                        ...prev.booking,
                        bookingTools: nextValues,
                        bookingToolsOther:
                          value === 'other' && !nextValues.includes('other')
                            ? ''
                            : prev.booking.bookingToolsOther,
                      },
                    };
                  })
                }
                t={t}
                translationPrefix="onboarding.steps.booking.options.bookingTools"
              />

              {formData.booking.bookingTools.includes('other') && (
                <Textarea
                  value={formData.booking.bookingToolsOther}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      booking: {
                        ...prev.booking,
                        bookingToolsOther: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.booking.placeholders.bookingToolsOther')}
                  rows={3}
                />
              )}

              <CheckboxGroup
                title={t('onboarding.steps.booking.fields.consultationFlow')}
                description={t('onboarding.steps.booking.hints.consultationFlow')}
                options={consultationOptions}
                values={formData.booking.consultationFlow}
                onToggle={(value) =>
                  setFormData((prev) => {
                    const nextValues = toggleArrayValue(prev.booking.consultationFlow, value);
                    return {
                      ...prev,
                      booking: {
                        ...prev.booking,
                        consultationFlow: nextValues,
                        consultationOther:
                          value === 'other' && !nextValues.includes('other')
                            ? ''
                            : prev.booking.consultationOther,
                      },
                    };
                  })
                }
                t={t}
                translationPrefix="onboarding.steps.booking.options.consultation"
              />

              {formData.booking.consultationFlow.includes('other') && (
                <Textarea
                  value={formData.booking.consultationOther}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      booking: {
                        ...prev.booking,
                        consultationOther: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.booking.placeholders.consultationOther')}
                  rows={3}
                />
              )}
            </div>
          </StepCard>
        );
      case 6:
        return (
          <StepCard
            title={t('onboarding.steps.policies.title')}
            description={t('onboarding.steps.policies.description')}
          >
            <div className="grid gap-6">
              <CheckboxGroup
                title={t('onboarding.steps.policies.fields.paymentMethods')}
                description={t('onboarding.steps.policies.hints.paymentMethods')}
                options={paymentMethods}
                values={formData.policies.paymentMethods}
                onToggle={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    policies: {
                      ...prev.policies,
                      paymentMethods: toggleArrayValue(prev.policies.paymentMethods, value),
                    },
                  }))
                }
                t={t}
                translationPrefix="onboarding.steps.policies.options.paymentMethods"
              />

              <div className="grid gap-2">
                <Label htmlFor="special-rules">{t('onboarding.steps.policies.fields.specialRules')}</Label>
                <Textarea
                  id="special-rules"
                  value={formData.policies.specialRules}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      policies: {
                        ...prev.policies,
                        specialRules: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.policies.placeholders.specialRules')}
                  rows={4}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="restricted-products">
                  {t('onboarding.steps.policies.fields.restrictedProducts')}
                </Label>
                <Textarea
                  id="restricted-products"
                  value={formData.policies.restrictedProducts}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      policies: {
                        ...prev.policies,
                        restrictedProducts: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.policies.placeholders.restrictedProducts')}
                  rows={3}
                />
              </div>
            </div>
          </StepCard>
        );
      case 7: {
        const selectedLanguages =
          formData.languageCulture.languages.length > 0
            ? formData.languageCulture.languages
            : availableLanguages;

        return (
          <StepCard
            title={t('onboarding.steps.languageCulture.title')}
            description={t('onboarding.steps.languageCulture.description')}
          >
            <div className="grid gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    {t('onboarding.steps.languageCulture.fields.languageSelection')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('onboarding.steps.languageCulture.hints.languageSelection')}
                  </p>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {availableLanguages.map((value) => {
                    const isSelected = formData.languageCulture.languages.includes(value);
                    return (
                      <label
                        key={value}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                          isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleLanguageToggle(value)}
                        />
                        <div>
                          <span className="font-medium">
                            {t(`onboarding.steps.languageCulture.options.languages.${value}`)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {formData.languageCulture.languages.includes('other') && (
                <Input
                  value={formData.languageCulture.otherLanguage}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      languageCulture: {
                        ...prev.languageCulture,
                        otherLanguage: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.languageCulture.placeholders.otherLanguage')}
                />
              )}

              <div className="space-y-3">
                <div>
                  <Label className="text-base font-medium">
                    {t('onboarding.steps.languageCulture.fields.defaultLanguage')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('onboarding.steps.languageCulture.hints.defaultLanguage')}
                  </p>
                </div>
                <RadioGroup
                  value={formData.languageCulture.defaultLanguage}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      languageCulture: {
                        ...prev.languageCulture,
                        defaultLanguage: value,
                      },
                    }))
                  }
                  className="grid gap-3 md:grid-cols-2"
                >
                  {selectedLanguages.map((value) => (
                    <Label
                      key={value}
                      className={cn(
                        'flex cursor-pointer flex-col gap-1 rounded-lg border p-4',
                        formData.languageCulture.defaultLanguage === value &&
                        'border-primary bg-primary/5'
                      )}
                    >
                      <RadioGroupItem value={value} className="sr-only" />
                      <span className="font-medium">
                        {t(`onboarding.steps.languageCulture.options.languages.${value}`)}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <Label>{t('onboarding.steps.languageCulture.fields.honorifics')}</Label>
                <RadioGroup
                  value={formData.languageCulture.honorifics}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      languageCulture: {
                        ...prev.languageCulture,
                        honorifics: value,
                      },
                    }))
                  }
                  className="grid gap-3 md:grid-cols-2"
                >
                  {honorificOptions.map((option) => (
                    <Label
                      key={option}
                      className={cn(
                        'flex cursor-pointer flex-col gap-1 rounded-lg border p-4',
                        formData.languageCulture.honorifics === option && 'border-primary bg-primary/5'
                      )}
                    >
                      <RadioGroupItem value={option} className="sr-only" />
                      <span className="font-medium">
                        {t(`onboarding.steps.languageCulture.options.honorifics.${option}`)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t(`onboarding.steps.languageCulture.options.honorificsDescriptions.${option}`)}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>{t('onboarding.steps.languageCulture.fields.culturalTone')}</Label>
                <Select
                  value={formData.languageCulture.culturalTone}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      languageCulture: {
                        ...prev.languageCulture,
                        culturalTone: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['formal', 'semi-formal', 'casual'].map((tone) => (
                      <SelectItem key={tone} value={tone}>
                        {t(`onboarding.steps.languageCulture.options.culturalTone.${tone}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </StepCard>
        );
      }
      case 8:
        return (
          <StepCard
            title={t('onboarding.steps.channels.title')}
            description={t('onboarding.steps.channels.description')}
          >
            <div className="grid gap-6">
              <CheckboxGroup
                title={t('onboarding.steps.channels.fields.aiAgentChannels')}
                description={t('onboarding.steps.channels.hints.aiAgentChannels')}
                options={aiAgentChannels}
                values={formData.channels.aiAgentChannels}
                onToggle={(value) =>
                  setFormData((prev) => {
                    const nextValues = toggleArrayValue(prev.channels.aiAgentChannels, value);
                    return {
                      ...prev,
                      channels: {
                        ...prev.channels,
                        aiAgentChannels: nextValues,
                        aiAgentOther:
                          value === 'other' && !nextValues.includes('other')
                            ? ''
                            : prev.channels.aiAgentOther,
                      },
                    };
                  })
                }
                t={t}
                translationPrefix="onboarding.steps.channels.options.aiAgentChannels"
              />

              {formData.channels.aiAgentChannels.includes('other') && (
                <Textarea
                  value={formData.channels.aiAgentOther}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        aiAgentOther: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.channels.placeholders.aiAgentOther')}
                  rows={3}
                />
              )}

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label className="text-base font-medium">
                    {t('onboarding.steps.channels.fields.website')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('onboarding.steps.channels.hints.website')}
                  </p>
                </div>
                <Switch
                  checked={formData.channels.website}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        website: Boolean(checked),
                      },
                    }))
                  }
                />
              </div>

              {formData.channels.website && (
                <div className="grid gap-2">
                  <Label htmlFor="website-url">{t('onboarding.steps.channels.fields.websiteUrl')}</Label>
                  <Input
                    id="website-url"
                    type="url"
                    value={formData.channels.websiteUrl}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        channels: {
                          ...prev.channels,
                          websiteUrl: event.target.value,
                        },
                      }))
                    }
                    placeholder={t('onboarding.steps.channels.placeholders.websiteUrl')}
                  />
                </div>
              )}

              <CheckboxGroup
                title={t('onboarding.steps.channels.fields.otherPlatforms')}
                description={t('onboarding.steps.channels.hints.otherPlatforms')}
                options={otherPlatforms}
                values={formData.channels.otherPlatforms}
                onToggle={(value) =>
                  setFormData((prev) => {
                    const nextValues = toggleArrayValue(prev.channels.otherPlatforms, value);
                    return {
                      ...prev,
                      channels: {
                        ...prev.channels,
                        otherPlatforms: nextValues,
                        otherPlatformsOther:
                          value === 'other' && !nextValues.includes('other')
                            ? ''
                            : prev.channels.otherPlatformsOther,
                      },
                    };
                  })
                }
                t={t}
                translationPrefix="onboarding.steps.channels.options.otherPlatforms"
              />

              {formData.channels.otherPlatforms.includes('other') && (
                <Textarea
                  value={formData.channels.otherPlatformsOther}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      channels: {
                        ...prev.channels,
                        otherPlatformsOther: event.target.value,
                      },
                    }))
                  }
                  placeholder={t('onboarding.steps.channels.placeholders.otherPlatformsOther')}
                  rows={3}
                />
              )}
            </div>
          </StepCard>
        );
      default:
        return null;
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }



  const handleNextStep = () => {
    if (!validateCurrentStep()) {
      toast({
        title: t('onboarding.toast.validation.title'),
        description: t('onboarding.toast.validation.description'),
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleDisabledNextClick = () => {
    if (!validateCurrentStep()) {
      toast({
        title: t('onboarding.toast.validation.title'),
        description: t('onboarding.toast.validation.description'),
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="space-y-6 sm:space-y-8" ref={formTopRef}>
      <div className="rounded-lg border p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">
              {t('onboarding.labels.progress')}
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
              {stepTitles[currentStep]}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t('onboarding.labels.step')} {currentStep + 1}{' '}
              {t('onboarding.labels.of')} {totalSteps}
            </p>
          </div>
          <div className="w-full md:w-64">
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {renderStep()}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 0 || isSubmitting}
            className="w-full sm:w-auto min-h-[44px]"
          >
            {t('onboarding.buttons.back')}
          </Button>
          {currentStep < totalSteps - 1 ? (
            <div className="relative w-full sm:w-auto">
              <Button
                type="button"
                onClick={validateCurrentStep() ? handleNextStep : handleDisabledNextClick}
                disabled={isSubmitting || !validateCurrentStep()}
                className="w-full sm:w-auto min-h-[44px]"
              >
                {t('onboarding.buttons.next')}
              </Button>
              {!validateCurrentStep() && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleDisabledNextClick}
                />
              )}
            </div>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto min-h-[44px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('onboarding.buttons.submitting')}
                </span>
              ) : (
                t('onboarding.buttons.submit')
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-primary/10 shadow-sm">
      <CardHeader className="space-y-2 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-sm sm:text-base leading-relaxed">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">{children}</CardContent>
    </Card>
  );
}

function CheckboxRow({
  id,
  checked,
  label,
  onCheckedChange,
}: {
  id: string;
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 sm:p-4 transition-colors min-h-[44px]',
        checked ? 'border-primary bg-primary/5' : 'hover:bg-muted'
      )}
    >
      <span className="text-sm sm:text-base flex-1 min-w-0">{label}</span>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(Boolean(value))}
        className="flex-shrink-0"
      />
    </label>
  );
}

function CheckboxGroup({
  title,
  description,
  options,
  values,
  onToggle,
  t,
  translationPrefix,
}: {
  title: string;
  description?: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  t: (key: string) => string;
  translationPrefix: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">{title}</Label>
        {description ? (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const labelKey = `${translationPrefix}.${option}.label`;
          const fallbackKey = `${translationPrefix}.${option}`;
          const rawLabel = t(labelKey);
          const label = rawLabel !== labelKey ? rawLabel : t(fallbackKey);

          const descriptionKey = `${translationPrefix}.${option}.description`;
          const rawDescription = t(descriptionKey);
          const description = rawDescription !== descriptionKey ? rawDescription : '';

          return (
            <label
              key={option}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border p-3 sm:p-4 transition-colors min-h-[44px]',
                values.includes(option) ? 'border-primary bg-primary/5' : 'hover:bg-muted'
              )}
            >
              <Checkbox
                checked={values.includes(option)}
                onCheckedChange={() => onToggle(option)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-sm sm:text-base block">{label}</span>
                {description ? (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {description}
                  </p>
                ) : null}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
