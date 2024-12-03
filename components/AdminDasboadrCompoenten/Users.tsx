import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";

const chatData: Chat[] = [
  {
    active: true,
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    text: "Hello, how are you?",
    time: "12 min",
    textCount: 3,
    dot: 3,
  },
  {
    active: true,
    avatar: "/images/user/user-02.png",
    name: "Henry Fisher",
    text: "I am waiting for you",
    time: "5:54 PM",
    textCount: 0,
    dot: 1,
  },
  {
    active: null,
    avatar: "/images/user/user-04.png",
    name: "Wilium Smith",
    text: "Where are you now?",
    time: "10:12 PM",
    textCount: 0,
    dot: 3,
  },
  {
    active: true,
    seen: true,
    avatar: "/images/user/user-05.png",
    name: "Henry Deco",
    text: "Thank you so much!",
    time: "Sun",
    textCount: 2,
    dot: 6,
  },
  {
    active: false,
    avatar: "/images/user/user-06.png",
    name: "Jubin Jack",
    text: "Hello, how are you?",
    time: "Oct 23",
    textCount: 0,
    dot: 3,
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-xl bg-white py-6 shadow-lg dark:bg-gray-dark dark:shadow-lg xl:col-span-4">
      <h4 className="mb-6 px-6 text-2xl font-semibold text-gray-800 ">Users</h4>

      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-6 px-6 py-4 mb-4 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            key={key}
          >
            {/* Avatar Section */}
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-dark-2 shadow-md">
              <Image
                width={64}
                height={64}
                src={chat.avatar}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Chat Info Section */}
            <div className="flex flex-1 items-center justify-between pr-4">
              <div>
                <h5 className="font-medium text-gray-800 ">{chat.name}</h5>
              </div>

              {/* Text Count Badge */}
              {chat.textCount !== 0 && (
                <div className="flex items-center justify-center rounded-full bg-primary  px-3 py-1 text-xs font-semibold shadow-md">
                  {chat.textCount}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
