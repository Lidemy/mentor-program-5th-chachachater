import styled from "styled-components";
import SocialFollow from "../../SocialFollow";
import { Title, Container, Content } from "../../UserStyle";

const Root = styled.div`
  max-width: 70%;
  margin: auto;
`;
const SocialMedia = styled.div`
  background-color: #ffffff;
  color: #82ada9;
  font-size: 24px;
`;

function AboutMe() {
  return (
    <Container>
      <Title>About Me</Title>
      <Content>
        The “about us” page is a must-have page (this can be a page on your
        website, separate landing page or even “about me” website as a type of
        portfolio) used by all types of businesses to give customers more
        insight into who is involved with a given business and exactly what it
        does. Your “About me” page forms the first impression of a company or
        product, puts a name and a face to your business, and gives website
        visitor the opportunity to develop a connection with you (a good reason
        for a visitor to stay on your website!), and it is your best chance to
        convert more visits to enquiries/more enquiries to customers. About me
        page is a space for individuality and originality, it is an important
        marketing tool that should convince. Therefore, they are very different!
        Let’s get the best of the top About us samples and learn how to write
        about me page, that will pull your customers like a magnet.
      </Content>
      <SocialMedia>
        <SocialFollow />
      </SocialMedia>
    </Container>
  );
}

export default function HomePage() {
  return (
    <Root>
      <AboutMe />
    </Root>
  );
}
