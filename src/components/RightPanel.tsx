import NodeEditor, { ActiveNodeProps } from "./NodeEditor";
import { renderIcon } from "./NodesHousing";

function RightPanel({ activeNode, setActiveNode }: ActiveNodeProps) {
  return (
    <div className="bg-white border rounded-md duration-300 h-[calc(100vh-65px)] flex flex-col pb-6 absolute right-0 top-0 w-[500px] opacity-100">
      <div className="flex justify-between items-center px-4 py-4 border-b-2 w-full">
        <div className="flex items-center gap-3">
          {activeNode?.type && renderIcon[activeNode?.type]}
          <h2 className="text-lg text-black font-bold capitalize">
            {activeNode?.type}
          </h2>
        </div>
        <button onClick={() => setActiveNode(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="lucide lucide-x start-7"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div className="mt-4 h-[calc(100vh-100px)] overflow-hidden ">
        <h2 className="pl-5 text-xl text-gray-900 font-bold my-3">
          Write a message
        </h2>
        <form className=" flex flex-col justify-between px-5 gap-5  relative">
          <NodeEditor activeNode={activeNode} setActiveNode={setActiveNode} />
          <button
            className="inline-flex items-center justify-center whitespace-nowrap bg-[#0F172A] rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default RightPanel;
