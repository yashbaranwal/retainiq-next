import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
}

const DataTableSkeleton = ({
  columns = 5,
  rows = 7,
}: DataTableSkeletonProps) => {
  return (
    <div className="space-y-4">
      {/* Table Header Skeleton */}
      <div className="flex space-x-4 justify-between">
        {Array.from({ length: columns }).map((_, idx) => (
          <Skeleton className="h-12 w-full" key={idx} />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, idx) => (
            <Skeleton className="h-8 w-full" key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataTableSkeleton;
