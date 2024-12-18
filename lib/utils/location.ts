export async function detectUserLanguage(): Promise<string> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
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
      
      // Default to English for all other countries
      return 'en';
    } catch (error) {
      console.error('Error detecting user location:', error);
      return 'en'; // Fallback to English
    }
  }