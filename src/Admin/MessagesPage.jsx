import React, { useState } from "react";
import {
  Container,
  Accordion,
  Card,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap";

// Sample message data
const initialmessages = [
  {
    id: 1,
    subject: "Meeting Reminder",
    sender: "Alice",
    date: "2024-10-01",
    content: "Don’t forget about our meeting tomorrow at 10 AM.",
  },
  {
    id: 2,
    subject: "Project Update",
    sender: "Bob",
    date: "2024-10-02",
    content: "The project is on track for the deadline next week.",
  },
  {
    id: 3,
    subject: "Newsletter",
    sender: "Charlie",
    date: "2024-10-03",
    content: "Check out our latest updates in the company newsletter.",
  },
];

function MessagesPage() {
  const [messages, setMessages] = useState(initialmessages);
  const [activeKey, setActiveKey] = useState(null);

  // Handler to delete a message when 'read' button is clicked
  const handleReply = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };
  // Handler to open/close an accordion item
  const handleToggle = (index) => {
    setActiveKey(activeKey === index ? null : index); // Toggle the active message
  };
  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>Messages</h1>
      <span>
        You have <strong style={{ color: "red" }}>{messages.length}</strong>{" "}
        messages
      </span>
      <Accordion style={{ marginTop: "20px" }}>
        {messages.map((message, index) => (
          <Accordion.Item eventKey={String(index)} key={message.id}>
            <Accordion.Header onClick={() => handleToggle(index)}>
              <Row className="w-100">
                <Col md={8}>
                  <h5>{message.subject}</h5>
                </Col>
                <Col md={4} className="text-end">
                  <Badge bg="secondary">{message.sender}</Badge>{" "}
                  <span>{new Date(message.date).toLocaleDateString()}</span>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <Card.Body>
                <p>{message.content}</p>
                <Button
                  onClick={() => handleReply(message.id)}
                  variant="outline-primary"
                  size="sm"
                >
                  Recieved & Read
                </Button>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default MessagesPage;
