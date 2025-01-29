import { get } from "lodash";
import { usePost } from "hook";
import { useState } from "react";
import { storage } from "services";
import AppTheme from "./SharedTheme";
import { toast } from "react-toastify";
import { SitemarkIcon } from "./CustomIcons";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ColorModeSelect from "./ColorModeSelect";
import {
  Box,
  Stack,
  Button,
  TextField,
  FormLabel,
  Typography,
  CssBaseline,
  FormControl,
  Card as MuiCard,
} from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  display: "flex",
  alignSelf: "center",
  gap: theme.spacing(2),
  flexDirection: "column",
  padding: theme.spacing(4),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    inset: 0,
    zIndex: -1,
    content: '""',
    display: "block",
    position: "absolute",
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const SignUp = (props: { disableCustomTheme?: boolean }) => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    useState<string>("");

  const validateInputs = () => {
    let isValid = true;

    const phone = document.getElementById("phone") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password value is empty, fill it");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!phone.value || phone.value.length < 6) {
      isValid = false;
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("Phone number value is empty, fill it");
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage("");
    }

    return isValid;
  };

  const { mutate } = usePost({
    method: "post",
    path: "/api/admin/login",
    onError: (error) => {
      if (error instanceof Error) {
        toast.error("Xatolik! Tizimga kira olmadingiz.");
      }
    },
    onSuccess: (data) => {
      toast.success("Tizimga muvvaffaqiyatli kirdingiz");

      storage.set("token", get(data, "data.token", ""));

      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface dataInterface {
      phone: string | FormDataEntryValue | null;
      password: string | FormDataEntryValue | null;
    }

    const postData: dataInterface = {
      phone: String(data.get("phone")),
      password: String(data.get("password")),
    };

    mutate(postData);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <TextField
                required
                fullWidth
                id="phone"
                name="phone"
                type="tel"
                variant="outlined"
                error={phoneNumberError}
                placeholder="Your phone number"
                autoComplete="new-phone-number"
                helperText={phoneNumberErrorMessage}
                color={phoneNumberError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                variant="outlined"
                placeholder="••••••"
                error={passwordError}
                autoComplete="new-password"
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Log In
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};

export default SignUp;
