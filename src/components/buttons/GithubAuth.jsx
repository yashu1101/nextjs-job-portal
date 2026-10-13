'use client'
import { authClient } from "@/lib/auth-client";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GithubAuth() {
  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/auth/auth-callback",
    });
  };

  return (
    <button
      className="border border-zinc-300 flex-1 flex gap-1.5 items-center justify-center p-2.5 text-nowrap text-[14px] rounded-[10px]  "
      onClick={handleGithubLogin}>
      {" "}
      Github{" "}
      <FontAwesomeIcon
        className="text-[14px]"
        icon={faGithub}></FontAwesomeIcon>
    </button>
  );
}
