// src/routes/[page-name].js

/** @type {import('./$types').PageServerLoad} */


export const load = async () => {
  console.log('Server Load Run')
  const fetchsurvey = async () => {
    try {
      const response = await this.fetch('/.netlify/functions/queryResults');
      if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return {
    survey: fetchsurvey(),
  }
}
