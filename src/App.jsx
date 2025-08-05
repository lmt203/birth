import React, { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import './App.css'

function App() {
  const [showMessage, setShowMessage] = useState(false);
    const [recipientName, setRecipientName] = useState("");
    const [senderName, setSenderName] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const audioRef = useRef(null);
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, []);
  
    const handleGenerate = () => {
      if (recipientName && senderName) {
        const customUrl = `${window.location.origin}/message?to=${encodeURIComponent(
          recipientName
        )}&from=${encodeURIComponent(senderName)}`;
        setQrUrl(customUrl);
        setShowMessage(true);
      } else {
        alert("Vui lòng nhập đầy đủ tên người nhận và người gửi.");
      }
    };
  
    const handleReset = () => {
      setShowMessage(false);
      setRecipientName("");
      setSenderName("");
      setQrUrl("");
    };
  
   return (
      <div className="relative w-full min-h-screen bg-pink-100 overflow-hidden p-4">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-0" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center text-center text-white">
          {!showMessage ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow text-pink-600">
                🎉 Tạo lời chúc sinh nhật 🎉
              </h1>
              <input
                className="w-full max-w-md mb-4 p-3 rounded text-black text-lg"
                placeholder="Tên người nhận..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
              <input
                className="w-full max-w-md mb-6 p-3 rounded text-black text-lg"
                placeholder="Tên người gửi..."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl transition"
              >
                Tạo mã lời chúc 💌
              </button>
            </>
          ) : (
            <div className="animate-fadeIn mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-pink-300 mb-2">
                💝 Gửi tới {recipientName} 💝
              </h2>
              <p className="text-md md:text-lg text-white mb-6">
                Lời chúc đặc biệt từ <strong>{senderName}</strong>
              </p>
              <div className="relative w-80 h-80 mx-auto">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Red_Heart_symbol.svg/2048px-Red_Heart_symbol.svg.png"
                  alt="Heart Background"
                  className="absolute inset-0 w-full h-full object-contain opacity-10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <QRCodeCanvas
                      value={qrUrl}
                      size={300}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-200">
                Dùng camera điện thoại để mở lời chúc 💕
              </p>
              <button
                onClick={handleReset}
                className="mt-6 bg-white text-pink-600 font-bold py-2 px-4 rounded-full shadow hover:bg-gray-100"
              >
                🔁 Tạo lại lời chúc
              </button>
            </div>
          )}
          <audio ref={audioRef} loop autoPlay>
            <source
              src="https://www.bensound.com/bensound-music/bensound-happyrock.mp3"
              type="audio/mp3"
            />
          </audio>
        </div>
      </div>
    );
}

export default App
