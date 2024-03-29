import { Dropdown, Button, Divider, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { downloadFile, base64ToBlob } from "@/utils";
import { useContext, useRef } from "react";
import { GloablStateContext } from "@/context";
import LocalFileSelector from "@/fabritor/components/LocalFileSelector";
import { CenterV } from "@/fabritor/components/Center";
import { SETTER_WIDTH } from "@/config";

const items: MenuProps["items"] = [
  {
    key: "jpg",
    label: "Export to JPG",
  },
  {
    key: "png",
    label: "Export to PNG",
  },
  {
    key: "svg",
    label: "Export to SVG",
  },
  {
    key: "json",
    label: "Export to Template",
  },
  {
    type: "divider",
  },
  {
    key: "clipboard",
    label: "Copy to clipboard",
  },
];

export default function Export() {
  const { editor, setReady, setActiveObject } = useContext(GloablStateContext);
  const localFileSelectorRef = useRef<any>();

  const selectJsonFile = () => {
    localFileSelectorRef.current?.start?.();
  };

  const handleFileChange = (file) => {
    setReady(false);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const json = evt.target?.result as string;
      if (json) {
        await editor.loadFromJSON(json, true);
        editor.fhistory.reset();
        setReady(true);
        setActiveObject(null);
        editor.fireCustomModifiedEvent();
      }
    };
    reader.readAsText(file);
  };

  const copyImage = async () => {
    try {
      const png = editor.export2Img({ format: "png" });
      const blob = await base64ToBlob(png);
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      message.success("Copy successful.");
    } catch (e) {
      message.error("Copy failed. Please choose to export to local.");
    }
  };

  const handleClick = ({ key }) => {
    const { sketch } = editor;

    const name = sketch.fabritor_desc;
    let img;
    switch (key) {
      case "png":
        img = editor.export2Img({ format: "png" });
        downloadFile(img, "png", name);
        break;
      case "jpg":
        img = editor.export2Img({ format: "jpg" });
        downloadFile(img, "jpg", name);
        break;
      case "svg":
        img = editor.export2Svg();
        downloadFile(img, "svg", name);
        break;
      case "json":
        img = editor.canvas2Json();
        downloadFile(
          `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(img, null, 2)
          )}`,
          "json",
          name
        );
        break;
      case "clipboard":
        copyImage();
        break;
      default:
        break;
    }
  };
  return (
    <CenterV
      justify="flex-end"
      gap={16}
      style={{
        width: SETTER_WIDTH,
        paddingRight: 16,
      }}
    >
      <Button onClick={selectJsonFile}>Load Template</Button>
      <Dropdown
        menu={{ items, onClick: handleClick }}
        arrow={{ pointAtCenter: true }}
        placement="bottom"
      >
        <Button type="primary" icon={<ExportOutlined />}>
          Export
        </Button>
      </Dropdown>
      <LocalFileSelector
        accept="application/json"
        ref={localFileSelectorRef}
        onChange={handleFileChange}
      />
    </CenterV>
  );
}
