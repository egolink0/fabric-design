export const APP_NAME = "fabritor";
export const APP_VERSION = "3.0.0";
export const SCHEMA_VERSION = 3;
export const SCHEMA_VERSION_KEY = "fabritor_schema_version";
export const LOG_PREFIX = `${APP_NAME}_log：`;

export const OBJECT_DEFAULT_CONFIG = {
  // controls
  borderColor: "#FF2222",
  borderScaleFactor: 2,
  cornerStrokeColor: "#2222",
  cornerColor: "#FF2222",
  cornerSize: 12,
  cornerStyle: "circle",
  transparentCorners: false,
  padding: 0,
  centeredScaling: false,
  strokeUniform: true,
  paintFirst: "stroke",
};

export const TEXTBOX_DEFAULT_CONFIG = {
  // styles
  fill: "#000000",
  fontWeight: "normal",
  fontSize: 50,
  lineHeight: 1.3,
  textAlign: "center",
  fontFamily: "AlibabaPuHuiTi",
  // size
  width: 500,
  // 中文处理
  splitByGrapheme: true,
};

export const FONT_PRESET_FAMILY_LIST = [
  {
    label: (
      <span style={{ fontFamily: "SmileySans", fontSize: 16 }}>SmileySans</span>
    ),
    value: "SmileySans",
  },
  {
    label: (
      <span style={{ fontFamily: "AlibabaPuHuiTi", fontSize: 16 }}>
        AlibabaPuHuiTi
      </span>
    ),
    value: "AlibabaPuHuiTi",
  },

  {
    label: (
      <span style={{ fontFamily: "SourceHanSans", fontSize: 16 }}>
        SourceHanSans
      </span>
    ),
    value: "SourceHanSans",
  },
  {
    label: (
      <span style={{ fontFamily: "SourceHanSerif", fontSize: 16 }}>
        SourceHanSerif
      </span>
    ),
    value: "SourceHanSerif",
  },
];

export const SKETCH_ID = "fabric-design";

export const FABRITOR_CUSTOM_PROPS = [
  "id",
  "fabritor_desc",
  "selectable",
  "hasControls",
  "sub_type",
  "imageSource",
  "imageBorder",
  "oldArrowInfo",
];
