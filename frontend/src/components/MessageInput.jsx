import React, { useRef, useState } from "react";
import { Send, Image, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { selectedUser, sendMessage } = useChatStore();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // if (!file.type.startsWith("image/")) {
    //     toast.error("Please select an image file");
    //     return;
    // }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => setImagePreview(null);

  // Send message (text + optional image)
  const handleSendMessage = async () => {
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message:", error.message);
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="relative w-full bg-base-100 border-t border-base-300 p-2 flex flex-col gap-2">
      {/* Image preview */}
      {imagePreview && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-base-200 rounded-full p-1"
          >
            <X className="size-4 text-error" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          rows={1}
          placeholder="Type a message..."
          className="input input-bordered w-full resize-none py-2"
        />

        {/* Image Upload */}
        <label className="btn btn-ghost btn-circle py-2 cursor-pointer">
          <Image className="size-5 text-base-content" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </label>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!text.trim() && !imagePreview}
          className="btn btn-ghost btn-primary btn-circle shrink-0"
        >
          <Send className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
