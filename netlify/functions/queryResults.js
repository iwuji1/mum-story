const { BigQuery } = require('@google-cloud/bigquery');


exports.handler = async function (event, context) {
  try {

    // let key;
    // if (process.env.CONTEXT != 'dev') {
    //   // Use the credentials from the environment variable in production
    //   key = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    // } else {
    //   // Load credentials from the local JSON file during development
    //   key = require("./our-access-404113-ba8e70863a01.json");
    // }

    const key = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    const bigquery = new BigQuery({
     projectId: key.project_id,
     credentials: {
       client_email: key.client_email,
       private_key: key.private_key,
     },
    });
    // Check the BigQuery API connection by sending a test query
    const sqlQueries = [
      'SELECT * FROM our-access-404113.Data_export.EthB_dat',
      'SELECT * FROM our-access-404113.Data_export.Gender_dat',
      'SELECT * FROM our-access-404113.Data_export.age_gen_dat',
      'SELECT * FROM our-access-404113.Data_export.reg_Mstat',
      'SELECT * FROM our-access-404113.Data_export.words_dat',
      'SELECT * FROM our-access-404113.Data_export.lessons_dat',
    ];

    // Execute the BigQuery query
    const results = [];
    for (const sqlQuery of sqlQueries) {
      const [rows] = await bigquery.query(sqlQuery);
      results.push(rows);
    }

    // Convert the rows to JSON
    const jsonData = results.map((rows) => rows.map((row) => row));

    // Send the JSON data as the response
    return {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(results),
      jsonData
    }
  } catch (error) {
    console.error('Error executing the query:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
};
