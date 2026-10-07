import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalWords,
      totalWordLists,
      totalActivities,
      wordleActivities,
      wordSearchActivities,
      successfulGenerations,
      failedGenerations,
      pageVisits,
    ] = await Promise.all([
      prisma.word.count(),
      prisma.wordList.count(),
      prisma.activity.count(),
      prisma.activity.count({
        where: {
          type: "WORDLE",
        },
      }),
      prisma.activity.count({
        where: {
          type: "WORD_SEARCH",
        },
      }),
      prisma.generationLog.count({
        where: {
          success: true,
        },
      }),
      prisma.generationLog.count({
        where: {
          success: false,
        },
      }),
      prisma.pageVisit.findMany(),
    ]);

    const totalGenerations =
      successfulGenerations + failedGenerations;

    const successRate =
      totalGenerations > 0
        ? Math.round(
            (successfulGenerations / totalGenerations) * 100
          )
        : 0;

    const averageTimeOnPage =
      pageVisits.length > 0
        ? Math.round(
            pageVisits.reduce(
              (total, visit) => total + visit.durationMs,
              0
            ) / pageVisits.length
          )
        : 0;

    let mostUsedActivityType = "No activity data";

    const wordleGenerations =
      await prisma.generationLog.count({
        where: {
          activityType: "WORDLE",
        },
      });

    const wordSearchGenerations =
      await prisma.generationLog.count({
        where: {
          activityType: "WORD_SEARCH",
        },
      });

    if (
      wordleGenerations > 0 ||
      wordSearchGenerations > 0
    ) {
      mostUsedActivityType =
        wordleGenerations >= wordSearchGenerations
          ? "WORDLE"
          : "WORD_SEARCH";
    }

    return Response.json(
      {
        totalWords,
        totalWordLists,
        totalActivities,
        wordleActivities,
        wordSearchActivities,
        successfulGenerations,
        failedGenerations,
        totalGenerations,
        successRate,
        averageTimeOnPage,
        mostUsedActivityType,
        health: "ok",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET /api/dashboard error:", error);

    return Response.json(
      {
        error: "Unable to load dashboard statistics.",
      },
      {
        status: 500,
      }
    );
  }
}