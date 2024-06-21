import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {
  const counts = await prisma.issue.groupBy({
    by: ["status"],
    _count: true,
  });
  const countMap = {
    OPEN: counts.find((c) => c.status === "OPEN")?._count || 0,
    IN_PROGRESS: counts.find((c) => c.status === "IN_PROGRESS")?._count || 0,
    CLOSED: counts.find((c) => c.status === "CLOSED")?._count || 0,
  };

  return (
    <>
      <IssueSummary
        open={countMap.OPEN}
        closed={countMap.CLOSED}
        inProgress={countMap.IN_PROGRESS}
      />
      <IssueChart
        open={countMap.OPEN}
        closed={countMap.CLOSED}
        inProgress={countMap.IN_PROGRESS}
      />
    </>
  );
}
