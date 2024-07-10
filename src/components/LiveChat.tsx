import Draggable from "react-draggable";

type LiveChatProps = {
  onClose: () => void;
};

const LiveChat = ({ onClose }: LiveChatProps) => {
  return (
    <Draggable>
      <div className="absolute top-4 right-4 bg-[#f1f2f9] border-gray-300 shadow-lg cursor-grab z-[9999] min-h-[400px] max-w-md w-full max-h-[700px] rounded-xl">
        <div className="relative">
          <div className="flex justify-end items-center rounded-t-xl px-4 py-4 bg-gray-200 border-gray-300">
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-x size-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col h-[500px] overflow-y-auto  pb-8 relative">
            <div className="bg-white text-gray-900 py-3  px-12 w-full flex flex-col sticky top-0 left-0">
              <h4 className="font-bold text-xl text-gray-900">Flow Chat</h4>
              <p className="text-lg text-gray-500 ">Start the conversation</p>
            </div>
            <div className="px-10 flex flex-col mt-5">
              <div></div>{" "}
            </div>
            <div className="px-10 "></div>
          </div>
          <div className="sticky bottom-0 left-0 px-3 py-2 ">
            <div className="relative">
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                placeholder="Type a message..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-send size-5 absolute right-3 top-3 text-gray-300"
              >
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default LiveChat;
