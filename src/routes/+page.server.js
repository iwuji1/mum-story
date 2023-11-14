// src/routes/[page-name].js

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const response = await fetch('/.netlify/functions/queryResults');
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      const people = data[0].length;

      return {
        data,
        people
      }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
