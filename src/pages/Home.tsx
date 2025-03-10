import Lookup from "../utils/Lookup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthDialog from "../components/core/Auth/AuthDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setFiles, setMessages } from "../slice/messageSlice";
import { logout, setOpenDialog } from "../slice/authSlice";
import { verifyToken } from "../lib/utils";
import InputBox from "../components/core/InputBox";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: any) => state.auth);
  const [userInput, setUserInput] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);

  const onGenerate = async (input: string) => {
    if (!token) {
      dispatch(setOpenDialog(true));
      return;
    }

    if (user?.token <= 5) {
      toast.error("Insufficient token left. Please get more token.");
      navigate("/subscription");
      return;
    }
    const toastId = toast.loading("creating workspace...");
    try {
      const formData = new FormData();

      let msg: {
        role: string;
        content:
          | string
          | { type: string; text?: string; image_url?: { url: string } }[];
      } = {
        role: "user",
        content: input,
      };
      if (imageFile) {
        formData.append("image", imageFile);
        msg.content = [
          {
            type: "text",
            text: input,
          },
          {
            type: "image_url",
            image_url: {
              url: "imageUrl",
            },
          },
        ];
      }
      formData.append("chats", JSON.stringify([msg]));

      const { data } = await axios.post(
        `${BASE_URL}/work-space/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setImageFile(null);
      setUserInput("");
      dispatch(setMessages([msg]));
      navigate("/workspace/" + data.data._id);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message || error?.message);
      const res = verifyToken(error?.response?.data.message);
      if (res) {
        dispatch(logout());
      }
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    dispatch(setFiles(Lookup.DEFAULT_FILE));
  }, []);
  return (
    <div className="">
      <div className="flex flex-col items-center mt-36 xl:mt-40 gap-2">
        <h2 className="font-bold text-xl">{Lookup.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

        {/* input box */}
        <InputBox
          generateRes={onGenerate}
          userInput={userInput}
          setUserInput={setUserInput}
          location="home"
          setImageFile={setImageFile}
          imageFile={imageFile}
        />

        <div className="mt-8 flex flex-wrap max-w-xl items-center justify-center gap-3">
          {Lookup.SUGGSTIONS.map((suggstion, i) => (
            <div
              className="p-1 px-2 border rounded-full text-sm text-gray-400 bg-gray-900 hover:text-gray-200 cursor-pointer hover:bg-gray-800 transition-all"
              key={i}
              onClick={() => onGenerate(suggstion)}
            >
              {suggstion}
            </div>
          ))}
        </div>
      </div>
      {!token && <AuthDialog />}
    </div>
  );
};

export default Home;
