export async function handlers(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Good mornging!",
    }),
  };
}
