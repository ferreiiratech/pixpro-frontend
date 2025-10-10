import { LoginForm } from "@/app/login/login-form";
import { Logo } from "@/components/logo";
import Spline from "@splinetool/react-spline";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Logo />

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-background relative hidden lg:block">
        <Spline scene="https://prod.spline.design/e6970ZvNNZneZwJn/scene.splinecode" />
        <div className="absolute bottom-0 left-0 right-0 h-2/12 bg-gradient-to-t from-background/80 via-background/40 to-transparent backdrop-blur-sm" />
      </div>
    </div>
  );
}
