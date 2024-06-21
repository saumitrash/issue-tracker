import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "../_components/AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUsers = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
});

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await fetchUsers(parseInt(params.id));
  const session = await getServerSession(authOptions);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUsers(parseInt(params.id));

  return {
    title: `Issue: ${issue?.title}`,
    description: issue?.description,
  };
}

export default IssueDetailPage;
