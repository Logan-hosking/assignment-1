import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const { page, durationMs } = body;

    if (
      !page ||
      typeof page !== "string" ||
      !Number.isInteger(durationMs) ||
      durationMs < 0
    ) {
      return Response.json(
        {
          error: "Valid page and durationMs values are required.",
        },
        {
          status: 400,
        }
      );
    }

    const visit = await prisma.pageVisit.create({
      data: {
        page: page.trim(),
        durationMs,
      },
    });

    return Response.json(visit, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/page-visit error:", error);

    return Response.json(
      {
        error: "Unable to record page visit.",
      },
      {
        status: 500,
      }
    );
  }
}