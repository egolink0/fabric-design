import { LOGO_ICON } from "@/assets/icon";
import { CenterV } from "@/fabritor/components/Center";
import { PANEL_WIDTH } from "@/config";

export default function Logo() {
  return (
    <CenterV gap={5} style={{ width: PANEL_WIDTH, paddingLeft: 16 }}>
      <span style={{ fontWeight: "bold", fontSize: 14 }}>
        A creative editor based on fabricjs.
      </span>
    </CenterV>
  );
}
