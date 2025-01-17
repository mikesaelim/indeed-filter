import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

type NotesPopoverProps = {
  notes: string;
  testid?: string;
};

function NotesPopover({ notes, testid }: NotesPopoverProps) {
  // All the user input is coming from me, so this is fine
  const popover = (
    <Popover>
      <Popover.Body>
        <div dangerouslySetInnerHTML={{__html: notes.replaceAll("\n", "<br/>")}} />
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger placement="right" overlay={popover}>
      <i className="bi bi-sticky-fill" style={{"color": "orange"}} data-testid={testid} />
    </OverlayTrigger>
  );
}

export default NotesPopover;
