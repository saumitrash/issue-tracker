"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages === 0) {
    return null;
  }
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="3">
      <Text>
        Page {currentPage} of {Math.ceil(itemCount / pageSize)}
      </Text>
      <Button
        onClick={() => changePage(1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={() => changePage(totalPages)}
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
