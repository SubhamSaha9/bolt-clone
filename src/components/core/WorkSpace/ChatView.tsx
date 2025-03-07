import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setFiles, setMessages } from "../../../slice/messageSlice";
import Markdown from "react-markdown";
import Colors from "../../../utils/Colors";
import Lookup from "../../../utils/Lookup";
import Prompt from "../../../utils/Prompt";
import { aiChatSession } from "../../../utils/AiModel";
import { countToken, verifyToken } from "../../../lib/utils";
import { logout } from "../../../slice/authSlice";
import InputBox from "../InputBox";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ChatView = () => {
  const { workId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scroll = useRef<HTMLDivElement>(null);
  const { token, user } = useSelector((state: any) => state.auth);
  const { messages } = useSelector((state: any) => state.message);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getWorkSpaceData = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/work-space/get`,
        { workId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      const { chats, fileData } = data?.data;
      dispatch(setMessages(JSON.parse(chats)));
      if (data?.data?.fileData) {
        dispatch(setFiles({ ...Lookup.DEFAULT_FILE, ...JSON.parse(fileData) }));
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message || error?.message);
      const res = verifyToken(error?.response?.data.message);
      if (res) {
        dispatch(logout());
        navigate("/");
      }
    }
  };

  const generateRes = (input: string) => {
    dispatch(setMessages([...messages, { role: "user", content: input }]));
    setUserInput("");
  };

  const AIResp = async () => {
    if (user?.token <= 5) {
      toast.error("Insufficient token left. Please get more token.");
      navigate("/subscription");
      return;
    }

    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    try {
      const { response } = await aiChatSession.sendMessage(PROMPT);
      const msg = {
        role: "ai",
        content: response.text(),
      };
      dispatch(setMessages([...messages, msg]));

      await axios.post(
        `${BASE_URL}/work-space/update`,
        { workId, chats: JSON.stringify([...messages, msg]), type: "chat" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiToken = countToken(JSON.stringify(msg));
      await axios.post(
        `${BASE_URL}/auth/update-token`,
        { AItoken: aiToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    workId && getWorkSpaceData();
  }, [workId]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        AIResp();
      }
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col h-[90vh] p-6 rounded bg-gradient-to-b from-black via-black to-[#08021f] border">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {messages?.map((msg: any, i: number) => (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            key={i}
            ref={scroll}
          >
            {msg?.role === "user" && (
              <img
                src={user?.image}
                alt="user"
                height={35}
                width={35}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col flex-wrap overflow-hidden">
              <Markdown>{msg.content}</Markdown>
            </div>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center w-1/5"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            ref={scroll}
          >
            <div className="typing">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <InputBox
        userInput={userInput}
        setUserInput={setUserInput}
        generateRes={generateRes}
      />
    </div>
  );
};

export default ChatView;
