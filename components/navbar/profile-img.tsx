
import { LoginButton } from "../auth/login-button";
import { RegisterButton } from "../auth/register-button";
import { Button } from "../ui/button";
import { HeaderAvatar } from "./header-avatar";

interface ProfileImgProps {
	session: any
}

export function ProfileImg({ session }: ProfileImgProps) {
  return (
    <>
      {session ? (
        <div className="flex items-center">
          <HeaderAvatar src={session.user?.image} />
        </div>
      ) : (
        <div className="flex gap-4">
          <LoginButton>
            <Button variant="outline">Login</Button>
          </LoginButton>
          <RegisterButton>
            <Button variant="default">Sign up</Button>
          </RegisterButton>
        </div>
      )}
    </>
  );
}
