import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  //  Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const closeModal = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onChangePostForm = (event) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  };

  const submitUpdatePostForm = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);

    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  //   const resetAddPostData = () => {
  //     setShowAddPostModal(false);
  //     setUpdatedPost({
  //       title: "",
  //       description: "",
  //       url: "",
  //       status: "TO LEARN",
  //     });
  //   };
  return (
    <Modal show={showUpdatePostModal} onHide={closeModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitUpdatePostForm}>
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
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangePostForm}
            >
              <option value="TO LEARN" key="1">
                TO LEARN
              </option>
              <option value="LEARNING" key="2">
                LEARNING
              </option>
              <option value="LEARNED" key="3">
                LEARNED
              </option>
            </Form.Control>
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

export default UpdatePostModal;
