import ChatView from "../components/core/WorkSpace/ChatView";
import CodeView from "../components/core/WorkSpace/CodeView";

const WorkSpace = () => {
  return (
    <div
      className="px-2 py-1 bg-gradient-to-br
to-black from-[rgba(46,_9,_255,_0.2)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <ChatView />
        <div className="col-span-3 rounded">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
