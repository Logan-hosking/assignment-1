import prisma from "@/lib/prisma";

const validTypes = ["WORDLE", "WORD_SEARCH"];
const validDifficulties = ["EASY", "MEDIUM", "HARD"];

function getActivityId(id) {
  const activityId = Number(id);

  if (!Number.isInteger(activityId) || activityId <= 0) {
    return null;
  }

  return activityId;
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const activityId = getActivityId(id);

    if (!activityId) {
      return Response.json(
        { error: "Invalid activity ID." },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
      include: {
        wordList: {
          include: {
            words: {
              include: {
                phonemes: {
                  orderBy: {
                    position: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!activity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    return Response.json(activity, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/activities/[id] error:", error);

    return Response.json(
      { error: "Unable to retrieve activity." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const activityId = getActivityId(id);

    if (!activityId) {
      return Response.json(
        { error: "Invalid activity ID." },
        { status: 400 }
      );
    }

    const existingActivity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    if (!existingActivity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      name,
      type,
      difficulty,
      hint,
      wordListId,
    } = body;

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      return Response.json(
        { error: "Activity name is required." },
        { status: 400 }
      );
    }

    if (!validTypes.includes(type)) {
      return Response.json(
        { error: "Activity type must be WORDLE or WORD_SEARCH." },
        { status: 400 }
      );
    }

    if (!validDifficulties.includes(difficulty)) {
      return Response.json(
        { error: "Difficulty must be EASY, MEDIUM or HARD." },
        { status: 400 }
      );
    }

    if (
      wordListId !== null &&
      wordListId !== undefined &&
      (!Number.isInteger(wordListId) || wordListId <= 0)
    ) {
      return Response.json(
        { error: "wordListId must be a valid positive integer." },
        { status: 400 }
      );
    }

    if (wordListId) {
      const wordList = await prisma.wordList.findUnique({
        where: {
          id: wordListId,
        },
      });

      if (!wordList) {
        return Response.json(
          { error: "Word list not found." },
          { status: 404 }
        );
      }
    }

    const activity = await prisma.activity.update({
      where: {
        id: activityId,
      },
      data: {
        name: name.trim(),
        type,
        difficulty,
        hint: hint?.trim() || null,
        wordListId: wordListId || null,
      },
      include: {
        wordList: true,
      },
    });

    return Response.json(activity, {
      status: 200,
    });
  } catch (error) {
    console.error("PUT /api/activities/[id] error:", error);

    return Response.json(
      { error: "Unable to update activity." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const activityId = getActivityId(id);

    if (!activityId) {
      return Response.json(
        { error: "Invalid activity ID." },
        { status: 400 }
      );
    }

    const existingActivity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    if (!existingActivity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    await prisma.activity.delete({
      where: {
        id: activityId,
      },
    });

    return Response.json(
      {
        message: "Activity deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE /api/activities/[id] error:", error);

    return Response.json(
      { error: "Unable to delete activity." },
      { status: 500 }
    );
  }
}