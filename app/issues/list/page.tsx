import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatusValues = Object.values(Status);
  const status = validStatusValues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

// without the line below it would be a static route
// and won't show the updates because next caches everything for static routes
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "List of Issues ",
  description: "View all the issues in a paginated format",
  keywords: "home, issues",
};

export default IssuesPage;
