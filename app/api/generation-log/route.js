import prisma from "@/lib/prisma";

const validTypes = ["WORDLE", "WORD_SEARCH"];

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      activityType,
      success,
      errorMessage,
      activityId,
    } = body;

    if (!validTypes.includes(activityType)) {
      return Response.json(
        {
          error: "Invalid activity type.",
        },
        {
          status: 400,
        }
      );
    }

    if (typeof success !== "boolean") {
      return Response.json(
        {
          error: "Success must be true or false.",
        },
        {
          status: 400,
        }
      );
    }

    const log = await prisma.generationLog.create({
      data: {
        activityType,
        success,
        errorMessage:
          typeof errorMessage === "string" &&
          errorMessage.trim() !== ""
            ? errorMessage.trim()
            : null,
        activityId:
          Number.isInteger(activityId) && activityId > 0
            ? activityId
            : null,
      },
    });

    return Response.json(log, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/generation-log error:", error);

    return Response.json(
      {
        error: "Unable to record generation event.",
      },
      {
        status: 500,
      }
    );
  }
}