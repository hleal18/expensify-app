import React from 'react';
import Modal from 'react-modal';

class RemoveExpenseModal extends React.Component {
    onAcceptActionHandler = () => {
        this.props.onAction();
    };
    render() {
        return (
            <div>
                <Modal
                    isOpen={!!this.props.showModal}
                    onRequestClose={this.props.onCloseModal}
                    contentLabel="Remove Expense"
                    className="modal"
                >
                    <h3 className="modal__title">Do you want to delete the expense?</h3>
                    <button onClick={this.onAcceptActionHandler} className="button">
                        Accept
                    </button>
                </Modal>
            </div>
        );
    }
}

export default RemoveExpenseModal;