import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

async function getLatestIssues() {
  const counts = await prisma.issue.groupBy({
    by: ["status"],
    _count: true,
  });
  const countMap = {
    OPEN: counts.find((c) => c.status === "OPEN")?._count || 0,
    IN_PROGRESS: counts.find((c) => c.status === "IN_PROGRESS")?._count || 0,
    CLOSED: counts.find((c) => c.status === "CLOSED")?._count || 0,
  };

  return countMap;
}

export default async function Home() {
  const countMap = await getLatestIssues();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
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
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const dynamic = "auto";

export const metadata: Metadata = {
  title: "Issue Tracker Dashboard",
  description: "View a summary of project issues",
  keywords: "home, issues",
};
