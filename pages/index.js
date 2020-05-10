import Layout from "../components/Layout";
import Kanban from "../components/Kanban/Kanban";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("initialData", (initialData) => {
  console.log(initialData);
});

const Index = (props) => (
  <Layout>
    <Kanban />
  </Layout>
);

export default Index;
