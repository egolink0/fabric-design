import { Flex } from "antd";
import LocalImagePanel from "./LocalImageSelector";
import RemoteImagePanel from "./RemoteImageSelector";

export default function ImageSelector(props) {
  const { onChange, ...rest } = props;

  return (
    <Flex vertical gap={10} justify="stretch" align="stretch">
      <LocalImagePanel {...rest} onChange={onChange}  />
      <RemoteImagePanel {...rest} onChange={onChange} />
    </Flex>
  );
}
