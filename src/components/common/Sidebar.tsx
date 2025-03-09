import { MessageCircleCode } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "../../assets/logo.png";
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
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openSheet } = useSelector((state: any) => state.action);
  const { token } = useSelector((state: any) => state.auth);

  const handleSideBar = (path: string) => {
    navigate(path);
    dispatch(setOpenSheet(false));
  };

  return (
    <Sheet open={openSheet} onOpenChange={(v) => dispatch(setOpenSheet(v))}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side="left"
        className="p-5 w-[300px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] to-black from-[rgba(46,_9,_255,_0.2)] flex flex-col justify-between"
      >
        <div className="">
          <SheetHeader className="mb-3">
            <SheetTitle>
              <Link
                to={"/"}
                className="flex items-center gap-1 mb-2 text-white"
              >
                <img src={Logo} alt="logo" width={30} height={30} />
                <span className="text-lg font-medium">Bolt.Clone</span>
              </Link>
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
          <div className="">
            {SideBarFooter.map((item, index) => (
              <Button
                key={index}
                className="w-full flex items-center justify-start gap-2"
                variant={"ghost"}
                onClick={() => handleSideBar(item.path)}
              >
                <item.icon /> {item.name}
              </Button>
            ))}
            <Profile />
          </div>
        )}
        <br />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
