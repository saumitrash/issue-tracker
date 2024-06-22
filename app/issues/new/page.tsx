import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssueForm = () => {
  return <IssueForm formType="new" />;
};

export default NewIssueForm;
