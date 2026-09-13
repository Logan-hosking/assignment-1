export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "phoneme-builder",
    },
    {
      status: 200,
    }
  );
}