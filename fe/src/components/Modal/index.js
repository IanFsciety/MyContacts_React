import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Overlay, Container, Footer} from "./styles";
import Button from "../Button"
import ReactPortal from "../ReactPortal";
export default function Modal({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm,
  visible, isLoading
}) {
  if (!visible) {
    return null;
  }


  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
      <div className="modal-body">
      {children}
      </div>

        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel}
          disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <Button
          isLoading={isLoading}
          type="button"
          danger={danger}
          onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    </ReactPortal>
  )



}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
}

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: "Confirmar",
  isLoading: false
}
