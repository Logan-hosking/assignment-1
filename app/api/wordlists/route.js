import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const wordLists = await prisma.wordList.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(wordLists, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/wordlists error:", error);

    return Response.json(
      {
        error: "Unable to retrieve word lists.",
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

    const { name, description } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return Response.json(
        {
          error: "Word list name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const wordList = await prisma.wordList.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return Response.json(wordList, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/wordlists error:", error);

    return Response.json(
      {
        error: "Unable to create word list.",
      },
      {
        status: 500,
      }
    );
  }
}