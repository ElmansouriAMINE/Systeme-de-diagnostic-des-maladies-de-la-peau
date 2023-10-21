import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLogout() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Log out ?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure ?.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">logout</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalLogout;