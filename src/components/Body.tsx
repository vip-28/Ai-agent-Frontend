import { useEffect, useState } from "react";
import axios from "axios";
import { marked } from "marked";

export const Body = () => {
  const [message, setMessage] = useState("");
  const [msgs, setMsgs] = useState<string[]>([]);
  const [resultMessage, setResultMessage] = useState<string[]>([]);
  const [clear, setClear] = useState(0);
  const [load, setLoad] = useState(false); // Initialize the loading state

  const handleSend = async () => {
    if (message) {
      setMsgs([...msgs, message]);
      setClear(clear + 1);
      setLoad(true); // Start loading

      try {
        const response = await axios.get("http://localhost:4012/api/content/", {
          params: { question: message },
        });

        setResultMessage((prevMessages) => [
          ...prevMessages,
          marked(response?.data?.result || ""),
        ]);
        setMessage("");
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false); // Stop loading after getting a response
      }
    } else {
      setClear(0);
    }
  };

  // if (load) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="text-2xl text-white">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="items-baseline grid grid-rows-1 gap-1 text-white">
      {clear === 0 ? (
        <div>
          <div className="flex justify-center items-end h-16">
            <div className="bg-black text-white w-20 h-7 rounded-2xl items-center flex justify-center">
              Agent
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-3xl rounded-2xl h-10 flex justify-center">
              ☕︎ Good Morning!
            </div>
          </div>
          <div className="ml-[56vh] h-2 flex">
            <div>💬</div>Prompt suggestion
          </div>
          <div className="flex justify-center">
            <div
              className="grid grid-rows-2 grid-cols-3 gap-4 p-4"
              style={{ height: "40vh", width: "100vh" }}
            >
              {[
                { label: "Make a Timetable", query: "Generate a timetable using this routine- " },
                { label: "Project Ideas", query: "Give me some Project Ideas" },
                { label: "New Technologies", query: "New Technologies in recent time in [Field]" },
                { label: "Efficient Learning", query: "Efficient ways to learn new things" },
                { label: "What is AI?", query: "what is AI" },
                { label: "Suggest Something", query: "Suggest me a [song/game/sport]" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 flex items-center justify-center text-white text-xl font-bold rounded p-6"
                >
                  <button className="h-[20vh]" onClick={() => setMessage(item.query)}>
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        resultMessage.map((msg, index) => (
          <div key={index}>
            <div className="flex justify-center w-screen text-xl my-6">{msgs[index]}</div>
            <div
              className="bg-black w-[120vh] text-white text-xl my-6 mx-4 p-5 bg-neutral-700"
              dangerouslySetInnerHTML={{ __html: msg }}
            />
          </div>
        ))
      )}
      {load==true ? ( 
   
<div className="flex justify-center items-center">
  <div className="flex justify-center items-center h-20 w-[650px] bg-neutral-700 m-8 text-xl rounded-xl">
    Loading
  </div>
</div>
 
): <div></div>}
      <div className="flex items-center w-[200vh] max-w-2xl mx-auto p-4 bg-gray-400 rounded-2xl shadow-lg m-[5vh]">
        <textarea
          className="text-black flex-grow resize-none bg-white p-2 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 h-9 flex items-center justify-center"
          onClick={handleSend}
        >
          🡱
        </button>
      </div>
    </div>
  );
};
