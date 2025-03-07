import { ArrowRight, Link } from "lucide-react";
import Lookup from "../../utils/Lookup";
import { Button } from "../ui/button";

const InputBox = ({
  userInput,
  setUserInput,
  generateRes,
}: {
  userInput: string;
  setUserInput: any;
  generateRes: any;
}) => {
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
      <Link className="h-5 w-5 cursor-pointer" />
    </div>
  );
};

export default InputBox;
