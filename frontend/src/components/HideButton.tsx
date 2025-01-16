import { CSSProperties } from "react";
import Button from "react-bootstrap/Button";

type HideButtonProps = {
  onClick: () => void;
  disabled: boolean;
  testid?: string;
};

function HideButton(props: HideButtonProps) {
  return (
    <Button
      variant="light" size="sm"
      style={{"--bs-btn-padding-y": 0} as CSSProperties}
      onClick={props.onClick}
      disabled={props.disabled}
      data-testid={props.testid}
    >
      <i className="bi bi-eye-slash" />
    </Button>
  );
}

export default HideButton;
