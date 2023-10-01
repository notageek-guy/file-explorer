import React, { useState } from "react";
import { FileData } from "@/pages/data";
import clsx from "clsx";
import { FolderPlus, FilePlus, Folder as FolderIcon, File } from "lucide-react";
const Folder = ({ data }: { data: FileData }) => {
  const hasNestedItems = data.items && data.items.length > 0;
  const [showNested, setShowNested] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const isFolder = data.isFolder;

  const toggleNested = () => {
    if (hasNestedItems) {
      setShowNested((prev) => !prev);
    }
  };

  const handleNewFolder = (e: any, isFolder: any): void => {
    e.stopPropagation();
    setShowNested(true);
    setShowInput({ visible: true, isFolder });
  };

  const addFolder = (e: any) => {
    if (e.keycode === 13 && e.target.value) {
      //add Logic
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <div className="border-b border-gray-200 w-64">
      <div
        className={clsx(
          "flex items-center cursor-pointer p-2 hover:bg-gray-200",
          hasNestedItems && "selectable"
        )}
        onClick={toggleNested}
      >
        {hasNestedItems && (
          <span className={clsx("pl-2 transform", showNested && "rotate-90")}>
            ▶️
          </span>
        )}

        {!isFolder && (
          <span className="pl-2" role="img" aria-label="File Icon">
            📄
          </span>
        )}

        <span className="pl-2 font-semibold">{data.name}</span>

        {hasNestedItems && (
          <div className="ml-auto flex space-x-2">
            <button onClick={(e) => handleNewFolder(e, true)}>
              <FolderPlus />
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              <FilePlus className="" />
            </button>
          </div>
        )}
      </div>

      {hasNestedItems && showNested && (
        <div style={{ paddingLeft: "2rem" }}>
          {showInput.visible && (
            <div className="flex space-x-2  items-center">
              <span>{showInput.isFolder ? <FolderIcon /> : <File />}</span>
              <input
                type="text"
                autoFocus
                onKeyDown={(e) => {}}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="px-2 py-2 rounded-md  border-[1px] border-gray-400 "
              />
            </div>
          )}
          {data.items.map((item) => (
            <Folder key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
