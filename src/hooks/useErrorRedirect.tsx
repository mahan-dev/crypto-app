import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultPath = "/";

const redirectDelay = 1000;

export const useErrorRedirect = (isError: boolean) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isError) return;

    toast.error("something wen't wrong", {
      duration: redirectDelay,
      position: "top-center",
    });

    const timer = setTimeout(() => {
      navigate(defaultPath, { replace: true });
    }, redirectDelay);
    return () => clearTimeout(timer);
  }, [isError, navigate]);
};
