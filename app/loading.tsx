import UiSkeleton from "@/components/ui/UiSkeleton";

export default async function Loading() {
  await new Promise((resolve) =>
    setTimeout(resolve, 7000)
  );

  return <UiSkeleton type="page" />;
}