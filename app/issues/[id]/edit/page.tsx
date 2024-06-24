import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
import IssueFormSkeleton from "./loading";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueForm formType="update" issue={issue} />;
};

export default EditIssuePage;
