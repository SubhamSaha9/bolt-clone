import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import { EllipsisVertical, Loader2Icon, Trash } from "lucide-react";
import { setOpenSheet } from "../../slice/actionSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const WorkHistory = () => {
  const { token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workSpaceList, setWorkSpaceList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkSpaceList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/work-space/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setWorkSpaceList(data?.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message || error?.message);
      const res = verifyToken(error?.response?.data.message);
      if (res) {
        dispatch(logout());
        navigate("/");
      }
    }
    setLoading(false);
  };

  const deleteWorkSpace = async (workId: any) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/work-space/delete`,
        { workId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      const updatedList = workSpaceList.filter(
        (workspace: any) => workspace?._id !== workId
      );
      setWorkSpaceList(updatedList);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message || error?.message);
    }
  };

  useEffect(() => {
    token && fetchWorkSpaceList();
  }, [token]);
  return (
    <div>
      <h2 className="font-medium text-lg px-2">Your Chats</h2>
      <div className="">
        {loading ? (
          <div className="flex items-center justify-center mt-5">
            <Loader2Icon className="animate-spin h-5 w-5" /> Loading Content...
          </div>
        ) : workSpaceList?.length > 0 ? (
          workSpaceList?.map((workSpace: any, i: number) => (
            <Link
              to={`/workspace/${workSpace?._id}`}
              key={i}
              onClick={() => dispatch(setOpenSheet(false))}
            >
              <div
                className="flex items-center justify-between  text-sm text-gray-400 py-2 px-4 rounded-md bg-gray-800 font-light mt-2 hover:text-white hover:bg-gray-600 cursor-pointer"
                title={JSON.parse(workSpace?.chats)[0].content}
              >
                <div className="line-clamp-1">
                  {JSON.parse(workSpace?.chats)[0].content}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="flex items-center gap-3">
                      <Trash onClick={() => deleteWorkSpace(workSpace?._id)} />
                      Delete
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-400 text-sm font-light text-center mt-6">
            No chats found
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkHistory;
