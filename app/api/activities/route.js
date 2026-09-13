import prisma from "@/lib/prisma";

const validTypes = ["WORDLE", "WORD_SEARCH"];
const validDifficulties = ["EASY", "MEDIUM", "HARD"];

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(activities, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/activities error:", error);

    return Response.json(
      {
        error: "Unable to retrieve activities.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
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
        {
          error: "Activity name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!validTypes.includes(type)) {
      return Response.json(
        {
          error: "Activity type must be WORDLE or WORD_SEARCH.",
        },
        {
          status: 400,
        }
      );
    }

    if (!validDifficulties.includes(difficulty)) {
      return Response.json(
        {
          error: "Difficulty must be EASY, MEDIUM or HARD.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      wordListId !== null &&
      wordListId !== undefined &&
      (!Number.isInteger(wordListId) || wordListId <= 0)
    ) {
      return Response.json(
        {
          error: "wordListId must be a valid positive integer.",
        },
        {
          status: 400,
        }
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
          {
            error: "Word list not found.",
          },
          {
            status: 404,
          }
        );
      }
    }

    const activity = await prisma.activity.create({
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
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/activities error:", error);

    return Response.json(
      {
        error: "Unable to create activity.",
      },
      {
        status: 500,
      }
    );
  }
}