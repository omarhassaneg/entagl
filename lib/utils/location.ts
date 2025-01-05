export async function detectUserLanguage(): Promise<string> {
  // First try browser language
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'tr', 'ru'].includes(browserLang)) {
      return browserLang;
    }
  }

  // Fallback to IP-based detection
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.country_code) {
      // Russian-speaking countries
      const russianCountries = ['RU', 'UZ', 'KZ', 'BY', 'KG'];
      if (russianCountries.includes(data.country_code)) {
        return 'ru';
      }
      
      // Turkish-speaking countries
      const turkishCountries = ['TR', 'CY'];
      if (turkishCountries.includes(data.country_code)) {
        return 'tr';
      }
    }
    
    return 'en';
  } catch (error) {
    // Silently fail and return default language
    return 'en';
  }
}