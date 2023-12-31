import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/AI";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    // to retrieve environment variable from env.local
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1999"
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      {/* SOCKET */}
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{
          height: "100vh",
        }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
