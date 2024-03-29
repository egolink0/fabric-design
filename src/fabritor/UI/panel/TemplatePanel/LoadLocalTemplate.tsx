import { createFImage } from "@/editor/objects/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GloablStateContext } from "@/context";
import { fabric } from "fabric";
import t1 from "./t1.json";
import t2 from "./t2.json";
import Editor from "@/editor";
import { Button, Flex, Image } from "antd";
import { uuid } from "@/utils";
import LocalFileSelector from "@/fabritor/components/LocalFileSelector";

export default function LoadLocalTemplate({ addNewJson }: any) {
  const localFileSelectorRef = useRef<any>();

  const [loading, setLoading] = useState(false);

  const selectJsonFile = () => {
    localFileSelectorRef.current?.start?.();
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const json = evt.target?.result as string;
      console.log(json);
      if (json) {
        addNewJSon(json);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Button onClick={selectJsonFile}>Load Template</Button>
      <LocalFileSelector
        accept="application/json"
        ref={localFileSelectorRef}
        onChange={handleFileChange}
      />
    </>
  );
}
