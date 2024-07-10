import { NodeProps, Position } from "reactflow";
import CustomHandle from "../components/CustomHandle";

type MessageNodeProps = {
  message?: string;
  image?: MediaImage;
};

export type messageNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: MessageNodeProps[];
};

export default function MessageNode({
  id,
  data,
}: NodeProps<MessageNodeProps[]>) {
  return (
    <div className="msg-node border-2 shadow-xl bg-white min-w-60 rounded-md max-w-[350px] break-words">
      <div className="p-6 pt-0 pb-0 px-0">
        <div className="flex items-center py-3 gap-8 px-3 justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="lucide lucide-message-circle size-6"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
          <div className="flex flex-col">
            <h3 className="text-lg text-gray-900 font-bold">Message</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="lucide lucide-ellipsis size-5"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-200 py-3 px-2  ">
            {data.map((item, index) => (
              <div key={index} className="bg-white w-full  p-3 rounded-md">
                <h3>{item.message || "Click to edit"}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomHandle id={id} type="source" position={Position.Right} />
    </div>
  );
}
