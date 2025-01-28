import { useState } from "react";
import axios from "axios";
import {marked} from "marked"

export const Body = () => {
  const [message, setMessage] = useState("");
  const [msgs,setMsgs]= useState<string[]>([]);
  // const[senderMessage,setSenderMessage]=useState([]);

  const [resultMessage, setResultMessage] = useState([]);
  const handleKeyPress = () => {};
  const handleSend = async () => {
    if (message) {
      setMsgs([...msgs,message])
      console.log(msgs);
      setClear(clear + 1);
      try {
        const response = await axios.get("http://localhost:4012/api/content/", {
          params: {
            question: message,
          }, // Send the message under the question key
        });
        console.log(response?.data?.result);
        
        setResultMessage((resultMessage) => [
          ...resultMessage,
          marked(response?.data?.result || ""),
        ]);
      setMessage("");

      } catch (err) {
        console.log(err);
      }
    } else {
      setClear(0);
    }
  };
  const [clear, setClear] = useState(0);
  return (
    <div className="items-baseline grid grid-rows-1 gap-1 text-white ">
      {clear == 0 ? (
        <div>
          <div className="flex justify-center items-end h-16 ">
            {/* good morning */}
            <div className="bg-black text-white w-20 h-7 rounded-2xl items-center flex justify-center">
              Agent
            </div>
          </div>
          <div className="flex justify-center items-center ">
            {/* good morning */}
            <div className="  text-3xl rounded-2xl h-10   flex justify-center">
              ☕︎ Good Morning!{" "}
            </div>
          </div>
          <div className="ml-[56vh] h-2 flex">
            {" "}
            <div className="">💬</div>Prompt suggestion
          </div>
          <div className="flex justify-center">
            <div
              className="grid grid-rows-2 grid-cols-3 gap-4 p-4"
              style={{ height: "40vh", width: "100vh" }} // Optional to center the grid
            >
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded ">
                <button
                  className="h-[20vh]"
                  onClick={() =>
                    setMessage("Generate a timetable using this routine- ")
                  }
                >
                  {" "}
                  Make a Timetable
                </button>
              </div>
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded ">
                <button
                  className="h-[20vh]"
                  onClick={() => setMessage("Give me some Project Ideas    ")}
                >
                  {" "}
                  Project Ideas
                </button>
              </div>
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded p-6 ">
                <button
                  className="h-[20vh]"
                  onClick={() =>
                    setMessage("New Technologies in recent time in [Field]  ")
                  }
                >
                  {" "}
                  New Technologies in recent times
                </button>
              </div>
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded p-7  ">
                <button
                  className="h-[20vh]"
                  onClick={() =>
                    setMessage("Efficient ways to learn new things   ")
                  }
                >
                  {" "}
                  Efficient ways to learn new things
                </button>
              </div>
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded ">
                <button
                  className="h-[20vh]"
                  onClick={() => setMessage("what is AI ")}
                >
                  {" "}
                  What is AI ?
                </button>
              </div>
              <div className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded p-7 ">
                <button
                  className="h-[20vh]"
                  onClick={() => setMessage("Suggest me a [song/game/sport]")}
                >
                  {" "}
                  Suggest me something
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        resultMessage.map((msg,index)=>{
          return(
            <div className="">
              <div className="flex justify-center w-screen text-xl my-6 ">{msgs[index]}</div>
              <div>
            <div
            className="bg-black w-[120vh] text-white text-xl my-6 mx-4 p-5 bg-neutral-700 "
            key={index}
            dangerouslySetInnerHTML={{ __html: msg }} // Use the HTML content from marked
          /></div>
          </div>
          )
        })
      )
      }
      <div className="flex items-center w-[200vh] max-w-2xl mx-auto p-4 bg-gray-400 rounded-2xl shadow-lg m-[5vh] ">
        <textarea
          className="text-black flex-grow resize-none bg-white p-2 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        ></textarea>
        <button
          className=" ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 h-9 flex items-center justify-center"
          onClick={handleSend}
        >
          🡱
        </button>
      </div>
    </div>
  );
};


