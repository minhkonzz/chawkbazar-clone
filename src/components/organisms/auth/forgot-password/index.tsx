import { useState, useCallback } from "@/configs/imports-wrapper";
import { TextInput, Button } from "@/components/atoms";
import { useFormValidation } from "@/hooks";
import { constants } from "@/configs";
import { requestPasswordReset } from "@/lib/firebase/auth/actions";
import styles1 from "../style.module.css";

import {
  AnimatedSuccessCheckIcon,
  AnimatedSpinnerIcon,
  AnimatedErrorIcon
} from "@/components/atoms/animated-icons";

const { EMAIL_REGEX } = constants.regex;

const getLocalAuthState = () => ({
  processing: {
    icon: {
      component: AnimatedSpinnerIcon,
      props: {}
    },
    text: "Processing...",
    color: "#000"
  },
  success: {
    icon: {
      component: AnimatedSuccessCheckIcon,
      props: {}
    },
    text: "We've sen't reset password link to you via email",
    color: "green"
  },
  error: {
    icon: {
      component: AnimatedErrorIcon,
      props: {}
    },
    text: "Error occured while sending reset password link",
    color: "red"
  }
});

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [process, setProcess] = useState<"processing" | "success" | "error">();

  const handleForgotPassword = async () => {
    setProcess("processing");
    const res = await requestPasswordReset(email, window.location.origin);
    setProcess(res.error && "error" || "success");
  };

  const { errors, handleAfterValidate: _handleForgotPassword } =
    useFormValidation(
      [
        {
          title: "Email",
          value: email,
          pattern: EMAIL_REGEX,
          errorIdentifier: "emailErr",
          errorMessage: "Email is not valid"
        }
      ],
      handleForgotPassword
    );

  const InnerButton = useCallback(() => {
    if (process) {
      const { icon, text } = getLocalAuthState()[process];
      const Icon = icon.component;
      return (
        <>
          <div className="posab">
            <Icon {...icon.props} />
          </div>
          {text}
        </>
      );
    }
    return <>Send me reset password link</>;
  }, [process]);

  return (
    <>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        inputValue={email}
        errorMessage={errors?.emailErr!}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        className={`${styles1.btn} w-100pc posrel`}
        onClick={_handleForgotPassword}
        style={
          (process && {
            backgroundColor: "transparent",
            border: `1px solid ${getLocalAuthState()[process].color}`,
            color: getLocalAuthState()[process].color
          }) ||
          {}
        }>
        <InnerButton />
      </Button>
    </>
  );
}
