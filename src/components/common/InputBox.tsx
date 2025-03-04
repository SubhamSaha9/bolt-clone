import { ArrowRight, Link, MessageCircleCode } from "lucide-react";
import Logo from "../../assets/logo.png";
import Lookup from "../../utils/Lookup";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import WorkHistory from "../core/WorkHistory";
import { SideBarFooter } from "../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSheet } from "../../slice/actionSlice";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const InputBox = ({
  userInput,
  setUserInput,
  generateRes,
}: {
  userInput: string;
  setUserInput: any;
  generateRes: any;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openSheet } = useSelector((state: any) => state.action);
  const { token } = useSelector((state: any) => state.auth);

  return (
    <div className="p-5 rounded-xl max-w-xl w-full mt-3 border-2 border-dashed bg-[#121212]">
      <div className="flex gap-2">
        <textarea
          placeholder={Lookup.INPUT_PLACEHOLDER}
          cols={30}
          rows={1}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          className="outline-none hover:outline-none bg-transparent w-full h-32 max-h-56 resize-none"
        />
        <Button
          className="bg-blue-500 text-gray-200 hover:bg-blue-600 hover:text-white p-2
              rounded-md cursor-pointer w-8"
          disabled={userInput.split(" ").length < 3}
          onClick={() => generateRes(userInput)}
        >
          <ArrowRight className=" h-8 w-8" />
        </Button>
      </div>

      <Sheet open={openSheet} onOpenChange={(v) => dispatch(setOpenSheet(v))}>
        <SheetTrigger>
          <Link className="h-5 w-5 cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-5 w-[300px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] to-black
from-[rgba(46,_9,_255,_0.2)] flex flex-col justify-between"
        >
          <div className="">
            <SheetHeader className="mb-3">
              <SheetTitle className="flex items-center gap-1 mb-2">
                <img src={Logo} alt="logo" width={30} height={30} />
                <span className="text-lg font-medium">Bolt.Clone</span>
              </SheetTitle>
              <SheetDescription>
                <Button className="w-[99%]">
                  <MessageCircleCode /> Start New Chat
                </Button>
              </SheetDescription>
            </SheetHeader>
            <WorkHistory />
          </div>
          {token && (
            <div className="sticky">
              {SideBarFooter.map((item, index) => (
                <Button
                  key={index}
                  className="w-full flex items-center justify-start gap-2"
                  variant={"ghost"}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon /> {item.name}
                </Button>
              ))}
              <Profile />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InputBox;
