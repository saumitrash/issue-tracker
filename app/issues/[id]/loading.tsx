import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="5" my="5">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
