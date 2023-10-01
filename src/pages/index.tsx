import React, { useState } from "react";
import explorer, { FileData } from "./data";
import Folder from "@/components/Folder";

function Home() {
  const [explorerData, setExplorerData] = useState<FileData>(explorer);
  return (
    <div className="min-h-screen bg-stone-50">
      <Folder data={explorerData} />
    </div>
  );
}

export default Home;
