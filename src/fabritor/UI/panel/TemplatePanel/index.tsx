import { createFImage } from "@/editor/objects/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GloablStateContext } from "@/context";
import { fabric } from "fabric";
import t1 from "./t1.json";
import t2 from "./t2.json";
import Editor from "@/editor";
import { Flex, Image } from "antd";
import { uuid } from "@/utils";

export default function TemplatePanel() {
  const { editor } = useContext(GloablStateContext);

  const canvasRef = useRef();
  const workspaceEl = useRef();

  const [dataSource, setDataSource] = useState([]);
  const [bgEditor, setBgEditor] = useState();

  const jsonList = [t1, t2];

  const changeJsonText = (json, textList) => {
    const res = {};

    const loop = (objects: any[]) => {
      objects?.forEach((item) => {
        if (item.type === "f-text") {
          const uid = uuid();
          item.uniqueId = uid;
          res[uid] = item.fontSize;
        }
        if (item.objects) loop(item.objects);
      });
    };
    loop(json?.objects);

    const ordered = Object.entries(res).sort((a, b) => b[1] - a[1]);
    const changedTextMap = {};
    textList.forEach((t, index) => {
      if (ordered[index]) {
        const uid = ordered[index][0];
        changedTextMap[uid] = t;
      }
    });
    console.log(ordered, changedTextMap);

    // replace by ordered
    const loopReplace = (objects: any[]) => {
      objects?.forEach((item) => {
        if (item.type === "f-text") {
          if (item.uniqueId && changedTextMap[item.uniqueId]) {
            item.text = changedTextMap[item.uniqueId];
          }
        }
        if (item.objects) loopReplace(item.objects);
        item.uniqueId = "";
      });
    };

    loopReplace(json?.objects);
  };

  const paintTemplateImg = async (json) => {
    await bgEditor.loadFromJSON(json);
    const img = bgEditor.export2Img({ format: "jpg" });
    return { json, img };
  };

  const flow = async () => {
    const textList = ["WeChat", "WeChat Reading: Explore, Connect, Enjoy!"];
    jsonList.forEach((item) => changeJsonText(item, textList));
    const res = [];

    console.log("jsonList", JSON.parse(JSON.stringify(jsonList)));

    for (let item of jsonList) {
      const data = await paintTemplateImg(item);
      res.push(data);
    }
    setDataSource(res);
  };

  useEffect(() => {
    if (bgEditor) {
      flow();
    }
  }, [bgEditor]);

  const applyToEditor = async (json: any) => {
    await editor.loadFromJSON(json, true);
    editor.fhistory.reset();
    setReady(true);
    setActiveObject(null);
    editor.fireCustomModifiedEvent();
  };

  const initBgEditor = async () => {
    const canvas = new Editor({
      template: {
        width: t1.objects[0].width,
        height: t1.objects[0].height,
      },
      canvasEl: canvasRef.current,
      workspaceEl: workspaceEl.current,
      sketchEventHandler: {
        groupHandler: () => {},
      },
    });
    await canvas.init();
    setBgEditor(canvas);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    initBgEditor();
  }, [canvasRef.current]);

  const renderList = () => {
    return dataSource.map((item) => {
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            width: "200px",
            height: "200px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            margin: "10px",
            cursor: "pointer",
          }}
          onClick={() => applyToEditor(item.json)}
        >
          <Image
            src={item.img}
            width="auto"
            height="auto"
            style={{
              overflow: "hidden",
              maxHeight: "200px",
              maxWidth: "200px",
            }}
            preview={false}
          />
        </Flex>
      );
    });
  };

  return (
    <>
      <div ref={workspaceEl} style={{ display: "none" }}>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      {renderList()}
    </>
  );
}
