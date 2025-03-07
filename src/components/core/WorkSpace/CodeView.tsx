import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import Lookup from "../../../utils/Lookup";
import { useDispatch, useSelector } from "react-redux";
import Prompt from "../../../utils/Prompt";
import { aiCodeSession } from "../../../utils/AiModel";
import toast from "react-hot-toast";
import { setFiles } from "../../../slice/messageSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { countToken, verifyToken } from "../../../lib/utils";
import { logout, setUser } from "../../../slice/authSlice";
import SandPackPreview from "./SandPackPreview";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CodeView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workId } = useParams();
  const { messages, files } = useSelector((state: any) => state.message);
  const { token } = useSelector((state: any) => state.auth);
  const { navAction } = useSelector((state: any) => state.action);
  const [activeTab, setActiveTab] = useState<string>("code");
  const [loading, setLoading] = useState<boolean>(false);

  const generateAiCode = async () => {
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    setLoading(true);
    try {
      const { response } = await aiCodeSession.sendMessage(PROMPT);
      if (!response) {
        toast.error("Failed to generate code");
        return;
      }
      toast.success("Code generated successfully");
      const resp = JSON.parse(response?.text());
      const content = resp?.files;
      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...content };
      dispatch(setFiles(mergedFiles));

      await axios.post(
        `${BASE_URL}/work-space/update`,
        { workId, files: JSON.stringify(content), type: "file" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiToken = countToken(JSON.stringify(content));
      const { data } = await axios.post(
        `${BASE_URL}/auth/update-token`,
        { AItoken: aiToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(setUser(data?.data));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
      const res = verifyToken(error?.response?.data.message);
      if (res) {
        dispatch(logout());
        navigate("/");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        generateAiCode();
      }
    }
  }, [messages]);

  useEffect(() => {
    navAction && setActiveTab("preview");
  }, [navAction]);

  return (
    <div className="rounded relative">
      <div className="w-full border p-2 bg-[#181818]">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 gap-3 w-[140px] justify-center rounded-full">
          <h2
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 py-1 px-2 rounded-full"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 py-1 px-2 rounded-full"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
        files={files}
        options={{
          externalResources: [
            "https://cdn.tailwindcss.com",
            "https://archive.org",
            "https://unsplash.com",
          ],
          classes: {
            "sp-wrapper": "no-scrollbar",
          },
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "82vh" }} />
              <SandpackCodeEditor style={{ height: "82vh" }} />
            </>
          ) : (
            <>
              <SandPackPreview />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center gap-2">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
