import { CSSProperties } from "react";
import Button from "react-bootstrap/Button";

type EditCompanyButtonProps = {
  onClick: () => void;
  disabled: boolean;
  testid?: string;
};

function EditCompanyButton(props: EditCompanyButtonProps) {
  return (
    <Button
      variant="light" size="sm"
      style={{"--bs-btn-padding-y": 0} as CSSProperties}
      onClick={props.onClick}
      disabled={props.disabled}
      data-testid={props.testid}
    >
      <i className="bi bi-pencil" />
    </Button>
  );
}

export default EditCompanyButton;
