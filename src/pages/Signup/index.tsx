import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import clsx from "clsx";
import { useSessionService } from "@/services/useSessionService";
import { ISignupRequest } from "@/types/api";

const Signup = () => {
  const { Signup, busy } = useSessionService();

  const formValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    key: z.string().min(1, "Key is required"),
    secret: z.string().min(1, "Secret is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignupRequest>({
    resolver: zodResolver(formValidation),
  });

  const key = localStorage.getItem("key");

  if (key) {
    return <Navigate to="/books" />;
  }

  const onSubmit = handleSubmit((values) => {
    Signup(values);
  });

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md p-10 rounded-xl">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-orange-main">Book</span> Shelf
        </h1>
        <p className="text-black-main text-center text-lg my-5">Welcome!</p>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-y-4 min-w-[300px] w-full"
        >
          <div>
            <InputLabel
              className="text-black-main !text-sm !font-semibold mb-1"
              htmlFor="name"
            >
              Fullname
            </InputLabel>
            <Input
              className={clsx(
                "border w-full border-[#DCD9D9] rounded-md p-2 text-black-main before:hidden",
                { "border-red-500": !!errors.name }
              )}
              {...register("name")}
              placeholder="Fullname"
              id="name"
              name="name"
            />
            {errors.name && (
              <FormHelperText className="!text-red-500">
                {errors.name.message as string}
              </FormHelperText>
            )}
          </div>
          <div>
            <InputLabel
              className="text-black-main !text-sm !font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </InputLabel>
            <Input
              className={clsx(
                "border w-full border-[#DCD9D9] rounded-md p-2 text-black-main before:hidden",
                { "border-red-500": !!errors.email }
              )}
              {...register("email")}
              placeholder="example@gmail.com"
              id="email"
              name="email"
            />
            {errors.email && (
              <FormHelperText className="!text-red-500">
                {errors.email.message as string}
              </FormHelperText>
            )}
          </div>
          <div>
            <InputLabel
              className="text-black-main !text-sm !font-semibold mb-1"
              htmlFor="key"
            >
              Key
            </InputLabel>
            <Input
              className={clsx(
                "border w-full border-[#DCD9D9] rounded-md p-2 text-black-main before:hidden",
                { "border-red-500": !!errors.key }
              )}
              {...register("key")}
              placeholder="Key"
              id="key"
              name="key"
            />
            {errors.key && (
              <FormHelperText className="!text-red-500">
                {errors.key.message as string}
              </FormHelperText>
            )}
          </div>
          <div>
            <InputLabel
              className="text-black-main !text-sm !font-semibold mb-1"
              htmlFor="secret"
            >
              Secret
            </InputLabel>
            <Input
              className={clsx(
                "border w-full border-[#DCD9D9] rounded-md p-2 text-black-main before:hidden",
                { "border-red-500": !!errors.secret }
              )}
              {...register("secret")}
              placeholder="Secret"
              id="secret"
              name="secret"
            />
            {errors.secret && (
              <FormHelperText className="!text-red-500">
                {errors.secret.message as string}
              </FormHelperText>
            )}
          </div>
          <Button
            type="submit"
            className="!text-white !bg-orange-main rounded-md disabled:cursor-not-allowed disabled:!bg-opacity-80"
            disabled={busy}
          >
            Signup
            {busy && <CircularProgress className="ml-2" size="20px" />}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
