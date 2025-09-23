import enCommon from './en/common.json';
import enNav from './en/nav.json';
import enFooter from './en/footer.json';
import enLanding from './en/landing.json';
import enHome from './en/home.json';
import enFeatures from './en/features.json';
import enServices from './en/services.json';
import enBlog from './en/blog.json';
import enPricing from './en/pricing.json';
import enContact from './en/contact.json';
import enOnboarding from './en/onboarding.json';
import enGuide from './en/guide.json';

import trCommon from './tr/common.json';
import trNav from './tr/nav.json';
import trFooter from './tr/footer.json';
import trLanding from './tr/landing.json';
import trHome from './tr/home.json';
import trFeatures from './tr/features.json';
import trServices from './tr/services.json';
import trBlog from './tr/blog.json';
import trPricing from './tr/pricing.json';
import trContact from './tr/contact.json';
import trOnboarding from './tr/onboarding.json';
import trGuide from './tr/guide.json';

import ruCommon from './ru/common.json';
import ruNav from './ru/nav.json';
import ruFooter from './ru/footer.json';
import ruLanding from './ru/landing.json';
import ruHome from './ru/home.json';
import ruFeatures from './ru/features.json';
import ruServices from './ru/services.json';
import ruBlog from './ru/blog.json';
import ruPricing from './ru/pricing.json';
import ruContact from './ru/contact.json';
import ruOnboarding from './ru/onboarding.json';
import ruGuide from './ru/guide.json';

const en = {
  common: enCommon,
  nav: enNav,
  footer: enFooter,
  landing: enLanding,
  home: enHome,
  features: enFeatures,
  services: enServices,
  blog: enBlog,
  pricing: enPricing,
  contact: enContact,
  onboarding: enOnboarding,
  guide: enGuide,
};

const tr = {
  common: trCommon,
  nav: trNav,
  footer: trFooter,
  landing: trLanding,
  home: trHome,
  features: trFeatures,
  services: trServices,
  blog: trBlog,
  pricing: trPricing,
  contact: trContact,
  onboarding: trOnboarding,
  guide: trGuide,
};

const ru = {
  common: ruCommon,
  nav: ruNav,
  footer: ruFooter,
  landing: ruLanding,
  home: ruHome,
  features: ruFeatures,
  services: ruServices,
  blog: ruBlog,
  pricing: ruPricing,
  contact: ruContact,
  onboarding: ruOnboarding,
  guide: ruGuide,
};

const translations = {
  en,
  tr,
  ru,
} as const;

export default translations;
