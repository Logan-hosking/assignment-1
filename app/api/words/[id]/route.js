import prisma from "@/lib/prisma";

function getWordId(id) {
  const wordId = Number(id);

  if (!Number.isInteger(wordId) || wordId <= 0) {
    return null;
  }

  return wordId;
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const wordId = getWordId(id);

    if (!wordId) {
      return Response.json(
        { error: "Invalid word ID." },
        { status: 400 }
      );
    }

    const word = await prisma.word.findUnique({
      where: {
        id: wordId,
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

    if (!word) {
      return Response.json(
        { error: "Word not found." },
        { status: 404 }
      );
    }

    return Response.json(word, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/words/[id] error:", error);

    return Response.json(
      { error: "Unable to retrieve word." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const wordId = getWordId(id);

    if (!wordId) {
      return Response.json(
        { error: "Invalid word ID." },
        { status: 400 }
      );
    }

    const existingWord = await prisma.word.findUnique({
      where: {
        id: wordId,
      },
    });

    if (!existingWord) {
      return Response.json(
        { error: "Word not found." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      english,
      hint,
      wordListId,
      phonemes,
    } = body;

    if (
      !english ||
      typeof english !== "string" ||
      english.trim() === ""
    ) {
      return Response.json(
        { error: "English word is required." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(wordListId) ||
      wordListId <= 0
    ) {
      return Response.json(
        { error: "A valid wordListId is required." },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(phonemes) ||
      phonemes.length === 0
    ) {
      return Response.json(
        { error: "At least one phoneme is required." },
        { status: 400 }
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
          error:
            "Each phoneme must be a non-empty string.",
        },
        { status: 400 }
      );
    }

    const updatedWord = await prisma.$transaction(
      async (tx) => {
        await tx.phoneme.deleteMany({
          where: {
            wordId,
          },
        });

        return tx.word.update({
          where: {
            id: wordId,
          },
          data: {
            english: english.trim(),
            hint: hint?.trim() || null,
            wordListId,
            phonemes: {
              create: phonemes.map(
                (symbol, index) => ({
                  symbol: symbol.trim(),
                  position: index,
                })
              ),
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
      }
    );

    return Response.json(updatedWord, {
      status: 200,
    });
  } catch (error) {
    console.error("PUT /api/words/[id] error:", error);

    return Response.json(
      { error: "Unable to update word." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const wordId = getWordId(id);

    if (!wordId) {
      return Response.json(
        { error: "Invalid word ID." },
        { status: 400 }
      );
    }

    const existingWord = await prisma.word.findUnique({
      where: {
        id: wordId,
      },
    });

    if (!existingWord) {
      return Response.json(
        { error: "Word not found." },
        { status: 404 }
      );
    }

    await prisma.word.delete({
      where: {
        id: wordId,
      },
    });

    return Response.json(
      {
        message: "Word deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE /api/words/[id] error:", error);

    return Response.json(
      { error: "Unable to delete word." },
      { status: 500 }
    );
  }
}