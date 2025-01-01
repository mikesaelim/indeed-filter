import { CSSProperties } from "react";
import Button from "react-bootstrap/Button";

type FocusButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

function FocusButton(props: FocusButtonProps) {
  return (
    <Button
      variant="light" size="sm"
      style={{"--bs-btn-padding-y": 0} as CSSProperties}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <i className="bi bi-box-arrow-right" />
    </Button>
  );
}

export default FocusButton;
