import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //  Contexts
  const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } =
    useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url, status } = newPost;

  const closeModal = () => {
    resetAddPostData();
  };

  const onChangePostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const submitAddPostForm = async (event) => {
    event.preventDefault();
    const { success, message } = await addNewPost(newPost);
    resetAddPostData();
    setShowToast({show: true, message: message, type: success ? 'success' : 'danger'})
  };

  const resetAddPostData = () => {
    setShowAddPostModal(false);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };

  return (
    <Modal show={showAddPostModal} onHide={closeModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitAddPostForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              onChange={onChangePostForm}
              value={title}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              name="description"
              onChange={onChangePostForm}
              value={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              onChange={onChangePostForm}
              value={url}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
