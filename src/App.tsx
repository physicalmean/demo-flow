import { ReactFlowProvider } from "reactflow";
import FlowBuilder from "./components/FlowBuilder";

export default function App() {
  return (
    <>
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </>
  );
}
