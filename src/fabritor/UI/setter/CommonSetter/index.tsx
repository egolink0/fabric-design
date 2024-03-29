import { useContext, useEffect, useState } from "react";
import { GloablStateContext } from "@/context";
import {
  LockOutlined,
  UnlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  PicCenterOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { SKETCH_ID } from "@/utils/constants";
import OpacitySetter from "./OpacitySetter";
import ToolbarItem from "../../header/Toolbar/ToolbarItem";
import { CenterV } from "@/fabritor/components/Center";
import { copyObject, pasteObject, removeObject } from "@/utils/helper";
import FlipSetter from "./FlipSetter";
import { Divider } from "antd";

const ALIGH_TYPES = [
  {
    label: "Center",
    icon: PicCenterOutlined,
    key: "center",
  },
  {
    label: "Align Left",
    icon: AlignLeftOutlined,
    key: "left",
  },
  {
    label: "Align Middle",
    icon: AlignCenterOutlined,
    key: "centerH",
  },
  {
    label: "Align Right",
    icon: AlignRightOutlined,
    key: "right",
  },
  {
    label: "Align Top",
    icon: VerticalAlignTopOutlined,
    key: "top",
  },
  {
    label: "Align Center",
    icon: VerticalAlignMiddleOutlined,
    key: "centerV",
  },
  {
    label: "Align Bottom",
    icon: VerticalAlignBottomOutlined,
    key: "bottom",
  },
];

export default function CommonSetter() {
  const { object, editor } = useContext(GloablStateContext);
  const [lock, setLock] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleLock = () => {
    object.set({
      lockMovementX: !lock,
      lockMovementY: !lock,
      hasControls: !!lock,
    });
    editor.canvas.requestRenderAll();
    setLock(!lock);
    editor.fireCustomModifiedEvent();
  };

  const handleOpacity = (v) => {
    object.set("opacity", v);
    setOpacity(v);
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  };

  const handleFlip = (key) => {
    object.set(key, !object[key]);
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  };

  const alignObject = (alignType) => {
    switch (alignType) {
      case "center":
        editor.canvas.viewportCenterObject(object);
        object.setCoords();
        break;
      case "left":
        object.set("left", 0);
        break;
      case "centerH":
        editor.canvas.viewportCenterObjectH(object);
        object.setCoords();
        break;
      case "right":
        object.set("left", editor.sketch.width - object.width);
        break;
      case "top":
        object.set("top", 0);
        break;
      case "centerV":
        editor.canvas.viewportCenterObjectV(object);
        object.setCoords();
        break;
      case "bottom":
        object.set("top", editor.sketch.height - object.height);
        break;
      default:
        break;
    }
    editor.canvas.requestRenderAll();
    editor.fireCustomModifiedEvent();
  };

  useEffect(() => {
    if (object) {
      setLock(object.lockMovementX);
      setOpacity(object.opacity);
    }
  }, [object]);

  if (!object || object.id === SKETCH_ID) return null;

  return (
    <>
      <CenterV height={30} gap={8} justify="space-between">
        <ToolbarItem
          tooltipProps={{ placement: "top" }}
          onClick={handleLock}
          title={lock ? "Unlock" : "Lock"}
        >
          {lock ? (
            <UnlockOutlined style={{ fontSize: 20 }} />
          ) : (
            <LockOutlined style={{ fontSize: 20 }} />
          )}
        </ToolbarItem>
        <ToolbarItem tooltipProps={{ placement: "top" }} title="Opacity">
          <OpacitySetter value={opacity} onChange={handleOpacity} />
        </ToolbarItem>
        <ToolbarItem
          tooltipProps={{ placement: "top" }}
          title="Deduplicate"
          onClick={async () => {
            await copyObject(editor.canvas, object);
            await pasteObject(editor.canvas);
          }}
        >
          <CopyOutlined style={{ fontSize: 20 }} />
        </ToolbarItem>
        <ToolbarItem
          tooltipProps={{ placement: "top" }}
          title="Delete"
          onClick={() => {
            removeObject(null, editor.canvas);
          }}
        >
          <DeleteOutlined style={{ fontSize: 20 }} />
        </ToolbarItem>
        {object.type === "f-image" ? (
          <ToolbarItem tooltipProps={{ placement: "top" }} title="Flip">
            <FlipSetter onChange={handleFlip} />
          </ToolbarItem>
        ) : null}
      </CenterV>
      <Divider style={{ margin: "16px 0" }} />
      <span style={{ fontWeight: "bold" }}>Align the canvas</span>
      <CenterV
        height={30}
        gap={8}
        justify="space-between"
        style={{ marginTop: 16 }}
      >
        {ALIGH_TYPES.map((item) => (
          <ToolbarItem
            tooltipProps={{ placement: "top" }}
            title={item.label}
            key={item.key}
            onClick={() => {
              alignObject(item.key);
            }}
          >
            <item.icon style={{ fontSize: 20 }} />
          </ToolbarItem>
        ))}
      </CenterV>
    </>
  );
}
