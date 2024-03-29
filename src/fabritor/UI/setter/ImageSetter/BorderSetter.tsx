import { Button } from "antd";
import { useState } from "react";
import { BorderOutlined } from "@ant-design/icons";
import MoreConfigWrapper from "../Form/MoreConfigWrapper";
import CommonBorderSetter from "../BorderSetter";

export default function BorderSetter(props) {
  const { value, onChange } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Button
        block
        icon={<BorderOutlined />}
        onClick={() => {
          setShowMore(true);
        }}
      >
        border
      </Button>
      <MoreConfigWrapper open={showMore} setOpen={setShowMore} title="border">
        <div style={{ marginTop: 24 }}>
          <CommonBorderSetter value={value} onChange={onChange} />
        </div>
      </MoreConfigWrapper>
    </>
  );
}
