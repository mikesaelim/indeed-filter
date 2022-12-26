import Button from "react-bootstrap/Button";

function HideButton(props) {
  return (
    <Button
      variant="light" size="sm"
      style={{"--bs-btn-padding-y": 0}}
      onClick={props.onClick}
      disabled={props.disabled}
      data-testid={props.testid}
    >
      <i className="bi bi-eye-slash" />
    </Button>
  );
}

export default HideButton;
