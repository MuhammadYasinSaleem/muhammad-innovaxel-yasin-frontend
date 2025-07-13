import Image from "next/image";
import Button from "./components/ui/Button";
import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full bg-[#181e29]">hello</div>
      </div>
    </div>
  );
}
