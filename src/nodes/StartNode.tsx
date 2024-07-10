import { NodeProps, Position } from "reactflow";
import CustomHandle from "../components/CustomHandle";
import { FaRegFlag } from "react-icons/fa";

export type startNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
};

export default function StartNode({ id }: NodeProps) {
  return (
    <div className="border text-card-foreground flex flex-col rounded-md shadow-md bg-white min-w-64 max-w-72 relative hover:ring-4 hover:ring-sky-500">
      <div className="p-6 pt-0 pb-0 px-0">
        <div className="flex items-center py-3 gap-8 px-3">
          <FaRegFlag size={24} />
          <div className="flex flex-col">
            <h3 className="text-lg text-gray-900 font-bold">Starting Point</h3>
            <p className="text-gray-600 text-lg w-[120px] text-wrap">
              where you bot begins
            </p>
          </div>
        </div>
      </div>
      <CustomHandle id={id} type="source" position={Position.Right} />
    </div>
  );
}
