import Logo from '@/components/logo';
import SignInForm from '@/components/sign-in';

export default function SignIn() {
  return (
    <div className="h-[100vh]">
      <div className="relative h-full items-center grid lg:grid-cols-2">
        <div className="lg:bg-slate-800 text-white items-center dark:border-r p-10 relative flex lg:h-full">
          <Logo className="flex flex-1 lg:text-white text-slate-800" />
        </div>
        <div className="lg:p-8 -mt-96 lg:m-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to Sign In
              </p>
            </div>
            <SignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground cursor-pointer hover:underline underline-offset-2">
              Forgot Your Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
