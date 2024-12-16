import { api } from "services";
import { useMutation } from "@tanstack/react-query";

interface usePostInterface {
  path: string;
  onError: (error: unknown) => void;
  onSuccess: (data: unknown) => void;
  method: "get" | "post" | "delete" | "put";
}

const usePost = ({
  path,
  method,
  onError = () => {},
  onSuccess = () => {},
}: usePostInterface) => {
  const mutation = useMutation({
    onError: (error) => onError(error),
    onSuccess: (data) => onSuccess(data),
    mutationFn: (data: any) => {
      if (typeof data === "object") {
        return api[method](path, data);
      } else {
        return Promise.resolve(undefined);
      }
    },
  });

  return {
    onError,
    onSuccess,
    ...mutation,
  };
};

export default usePost;
