import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      include: {
        phonemes: {
          orderBy: {
            position: "asc",
          },
        },
        wordList: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(words, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/words error:", error);

    return Response.json(
      {
        error: "Unable to retrieve words.",
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
      english,
      hint,
      wordListId,
      phonemes,
    } = body;

    if (!english || typeof english !== "string") {
      return Response.json(
        {
          error: "English word is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!wordListId || !Number.isInteger(wordListId)) {
      return Response.json(
        {
          error: "A valid wordListId is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!Array.isArray(phonemes) || phonemes.length === 0) {
      return Response.json(
        {
          error: "At least one phoneme is required.",
        },
        {
          status: 400,
        }
      );
    }

    const invalidPhoneme = phonemes.some(
      (phoneme) =>
        typeof phoneme !== "string" ||
        phoneme.trim() === ""
    );

    if (invalidPhoneme) {
      return Response.json(
        {
          error: "Each phoneme must be a non-empty string.",
        },
        {
          status: 400,
        }
      );
    }

    const word = await prisma.word.create({
      data: {
        english: english.trim(),
        hint: hint?.trim() || null,
        wordListId,
        phonemes: {
          create: phonemes.map((symbol, index) => ({
            symbol: symbol.trim(),
            position: index,
          })),
        },
      },
      include: {
        phonemes: {
          orderBy: {
            position: "asc",
          },
        },
        wordList: true,
      },
    });

    return Response.json(word, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/words error:", error);

    return Response.json(
      {
        error: "Unable to create word.",
      },
      {
        status: 500,
      }
    );
  }
}