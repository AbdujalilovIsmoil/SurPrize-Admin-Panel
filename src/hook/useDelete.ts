import { api } from "services";
import { useMutation } from "@tanstack/react-query";

interface useDeleteInterface {
  path: string;
  onError: (error: unknown) => void;
  onSuccess: (data: unknown) => void;
}

const useDelete = ({
  path,
  onError = () => {},
  onSuccess = () => {},
}: useDeleteInterface) => {
  const mutation = useMutation({
    onError: (error) => onError(error),
    onSuccess: (data) => onSuccess(data),
    mutationFn: (id: string) => {
      if (typeof id === "string") {
        return api.delete(`${path}/${id}`);
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

export default useDelete;
