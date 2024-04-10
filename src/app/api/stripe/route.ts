export const POST = async (request: Request) => {
  // stripe needs us to use the raw body from the post request
  const body = await request.text();
};
