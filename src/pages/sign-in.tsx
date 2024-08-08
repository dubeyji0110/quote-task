import Logo from '@/components/logo';
import SignInForm from '@/components/sign-in';

export default function SignIn() {
  return (
    <div className="h-[100vh]">
      <div className="relative h-full items-center justify-center grid lg:grid-cols-2">
        <div className="hidden bg-slate-800 text-white items-center dark:border-r p-10 relative lg:flex h-[100vh]">
          <Logo className="lg:flex flex-1" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
