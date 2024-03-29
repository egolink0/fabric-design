import { Slider } from "antd";
import "./index.scss";

import Sepia from "@/assets/filters/Sepia.png";
import Kodachrome from "@/assets/filters/Kodachrome.png";
import Vintage from "@/assets/filters/Vintage.png";
import Polaroid from "@/assets/filters/Polaroid.png";
import Blur from "@/assets/filters/Blur.png";
import Emboss from "@/assets/filters/Emboss.png";
import Pixelate from "@/assets/filters/Pixelate.png";
import Grayscale from "@/assets/filters/Grayscale.png";
import HueRotation from "@/assets/filters/HueRotation.png";

const COLOR_FILTER_LIST = [
  {
    label: "none",
    value: "none",
    src: "https://cdn.pixabay.com/photo/2017/02/15/13/18/girl-2068638_1280.jpg",
  },
  {
    label: "Sepia",
    value: "Sepia",
    src: Sepia,
  },
  //胶片
  {
    label: "Kodachrome",
    value: "Kodachrome",
    src: Kodachrome,
  },
  //老照片
  {
    label: "Vintage",
    value: "Vintage",
    src: Vintage,
  },
  //宝丽来
  {
    label: "Polaroid",
    value: "Polaroid",
    src: Polaroid,
  },
  // 模糊
  {
    label: "Blur",
    value: "Blur",
    src: Blur,
  },
  // 浮雕
  {
    label: "Emboss",
    value: "Emboss",
    src: Emboss,
  },
  // 像素
  {
    label: "Pixelate",
    value: "Pixelate",
    src: Pixelate,
  },
  // 黑白
  {
    label: "Grayscale",
    value: "Grayscale",
    src: Grayscale,
  },
  // 调色
  {
    label: "HueRotation",
    value: "HueRotation",
    src: HueRotation,
  },
];

export default function RadioImageGroup(props) {
  const { value, onChange } = props;

  const handleChange = (v, key) => {
    onChange?.({
      ...value,
      [key]: v,
    });
  };

  return (
    <div className="fabritor-radio-image-group">
      {COLOR_FILTER_LIST.map((option) => (
        <div
          className="fabritor-radio-image-group-item"
          onClick={() => {
            handleChange(option.value, "type");
          }}
        >
          <div
            className="fabritor-radio-image-group-img"
            style={{
              borderColor: value?.type === option.value ? "#ff2222" : "#eeeeee",
            }}
          >
            <img src={option.src} />
          </div>
          <span>{option.label}</span>
          {option.value === "Blur" && value?.type === "Blur" ? (
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={value?.param == undefined ? 0.2 : value?.param}
              onChange={(v) => {
                handleChange(v, "param");
              }}
            />
          ) : null}
          {option.value === "Pixelate" && value?.type === "Pixelate" ? (
            <Slider
              min={2}
              max={20}
              step={0.01}
              value={value?.param == undefined ? 4 : value?.param}
              onChange={(v) => {
                handleChange(v, "param");
              }}
            />
          ) : null}
          {option.value === "HueRotation" && value?.type === "HueRotation" ? (
            <Slider
              min={-2}
              max={2}
              step={0.002}
              value={value?.param == undefined ? 0 : value?.param}
              onChange={(v) => {
                handleChange(v, "param");
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
