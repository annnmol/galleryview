import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMedia } from "@/lib/dummy-data";
import { formatDateTime } from "@/lib/utils";

interface Props {
  data: IMedia[];
}

const RecentFiles = ({ data }: Props) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((file, index) => (
              <TableRow key={file?.id ?? index.toString()}>
                <TableCell>
                  <a className="" target="_blank" href={file?.url}>
                    {file.title}
                  </a>
                </TableCell>
                <TableCell className="">{file.type}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatDateTime(file.createdAt).dateOnly}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Files found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default RecentFiles;
