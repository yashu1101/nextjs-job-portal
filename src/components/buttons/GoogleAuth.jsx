'use client'
import { authClient } from "@/lib/auth-client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GoogleAuth() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth/auth-callback",
    });
  };

  return (
    <button
      className="border border-zinc-300 flex-1 flex gap-1.5 items-center justify-center p-2.5 text-nowrap text-[14px] rounded-[10px]  "
      onClick={handleGoogleLogin}>
      {" "}
      Google{" "}
      <FontAwesomeIcon
        className="text-[14px]"
        icon={faGoogle}></FontAwesomeIcon>
    </button>
  );
}
