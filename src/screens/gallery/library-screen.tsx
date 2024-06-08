import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//user defined
import { MediaCard } from "@/components/cards/media-card";
import LayoutWrapper from "@/components/layout-wrapper/layout-wrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AppStoreContext } from "@/store/app-store-context";
import FileInput from "@/components/input/file-input";
import { AVAIABLE_MEDIA_TYPES } from "@/lib/utils";

const LibraryScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filesData } = useContext(AppStoreContext);
  const [filteredData, setFilteredData] = useState(filesData);

  useEffect(() => {
    if (!AVAIABLE_MEDIA_TYPES.includes(id ?? "")) {
      navigate("/");
    }
    if (id) {
      setFilteredData(filesData.filter((file) => file.type === id) ?? []);
    }
  }, [id, filesData]); // eslint-disable-line

  return (
    <LayoutWrapper className="">
      <div className="flex justify-between align-middle w-full space-y-1">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {id?.toUpperCase()}S for You
          </h2>
          <p className="text-sm text-muted-foreground">
            Your personal playlists {id}. Updated daily.
          </p>
        </div>

        <FileInput />
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex flex-wrap space-x-4 pb-4">
            {filteredData.map((file, index) => (
              <MediaCard
                key={file.id ?? index.toString()}
                file={file}
                className="w-[250px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </LayoutWrapper>
  );
};

export default LibraryScreen;
