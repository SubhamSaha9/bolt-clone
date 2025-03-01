import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavAction } from "../../../slice/actionSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import Colors from "../../../utils/Colors";

const SandPackPreview = () => {
  const previewRef = useRef<SandpackPreviewRef>(null);
  const { sandpack } = useSandpack();
  const { navAction } = useSelector((state: any) => state.action);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const getSandPackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      const result = await client?.getCodeSandboxURL();
      if (navAction?.type === "deploy") {
        setOpen(true);
        setUrl(`https://${result?.sandboxId}.csb.app`);
        window.navigator.clipboard.writeText(
          `https://${result?.sandboxId}.csb.app`
        );
        toast.success("Deployed link Copied to clipboard");
        dispatch(setNavAction(null));

        return;
      } else if (navAction?.type === "export") {
        window.open(result?.editorUrl, "_blank");
        dispatch(setNavAction(null));
        return;
      }
    }
  };

  useEffect(() => {
    getSandPackClient();
  }, [sandpack && navAction]);
  return (
    <>
      <SandpackPreview
        style={{ height: "82vh" }}
        showNavigator={true}
        ref={previewRef}
      />
      {open && (
        <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="px-4">Open in new tab</DialogTitle>
              <DialogDescription>
                <div className="w-full flex flex-col items-start gap-3 p-4">
                  <span className="mb-3">
                    App is deployed and link is already copied to clipboard.
                    Click below to visit the page in new Tab.
                  </span>
                  <a href={url} target="_blank" className="text-white">
                    <Button
                      className="text-white"
                      style={{ backgroundColor: Colors.BLUE }}
                      onClick={() => setOpen(false)}
                    >
                      Open
                    </Button>
                  </a>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SandPackPreview;
