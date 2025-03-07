import { ArrowRight, ImagePlusIcon, X } from "lucide-react";
import Lookup from "../../utils/Lookup";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";

const InputBox = ({
  userInput,
  setUserInput,
  generateRes,
}: {
  userInput: string;
  setUserInput: any;
  generateRes: any;
}) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
      setPreviewName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setPreviewName(null);
    setPreviewURL(null);
  };

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
      {previewURL ? (
        <div className="rounded-lg flex items-start gap-2 justify-between bg-gray-800">
          <div className="flex flex-col max-w-36 items-center p-2 bg-gray-700 rounded-l-lg">
            <img
              src={previewURL}
              alt="preview"
              className="max-w-32 rounded-md"
            />
            <h2 className="text-xs text-gray-200 line-clamp-1">
              {previewName}
            </h2>
          </div>
          <div className="px-2 mt-1 cursor-pointer" onClick={handleRemoveFile}>
            <X className="w-4" />
          </div>
        </div>
      ) : (
        <div className="w-32">
          <label
            htmlFor="image"
            title="Upload Image"
            className="group flex gap-1 items-start w-10 hover:bg-gray-800 hover:rounded-full hover:w-32 px-2 py-1 transition-all delay-75 cursor-pointer"
          >
            <ImagePlusIcon className="min-h-5 min-w-5 max-h-5 max-w-5 ml-1 opacity-75 group-hover:opacity-100" />
            <span className="hidden text-sm group-hover:block line-clamp-1 text-nowrap">
              Select Image
            </span>
          </label>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="image"
            multiple={false}
            onChange={handleImageSelect}
          />
        </div>
      )}
    </div>
  );
};

export default InputBox;
