import { IMedia } from "@/lib/dummy-data";
import { cn, formatDateTime } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  file: IMedia;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function MediaCard({
  file,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: Props) {
  return (
    <Link to={file.url ?? "#"} target="_blank">
      <div className={cn("space-y-3 mb-8 p-4", className)} {...props}>
        <div className="overflow-hidden rounded-md">
          <img
            src={file.cover ?? file.data}
            alt={file.title}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{file.title}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(file.createdAt).dateOnly}
          </p>
        </div>
      </div>
    </Link>
  );
}
