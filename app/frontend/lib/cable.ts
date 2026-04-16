import { createConsumer } from "@rails/actioncable";

// Generates a singleton ActionCable consumer for the entire frontend application
const cable = createConsumer();

export default cable;
