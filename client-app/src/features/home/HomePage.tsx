import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              {" "}
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              {" "}
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              {" "}
              Register!
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
            <Button
              as={FacebookLogin}
              appId="1486013808477203"
              size="huge"
              inverted
              color="facebook"
              content="Login in Facebook"
              onSuccess={(response: any) => {
                console.log("Login success", response);
              }}
              onFail={(response: any) => {
                console.log("Login failed", response);
              }}
            />
          </>
        )}
      </Container>
    </Segment>
  );
}
