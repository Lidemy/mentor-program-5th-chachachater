import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const SocailContainer = styled.div`
  padding: 25px 50px;
  text-align: center;
`;
const Logo = styled.a`
  margin: 0 1rem;
  transition: transform 250ms;
  display: inline-block;
  &:hover {
    transform: translateY(-2px);
  }
  &.youtube {
    color: #eb3223;
  }
  &.facebook {
    color: #4968ad;
  }
  &.twitter {
    color: #49a1eb;
  }
  &.instagram {
    color: black;
  }
`;

export default function SocialFollow() {
  return (
    <SocailContainer>
      <h3>Social Follow</h3>
      <Logo href="https://www.youtube.com" className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </Logo>
      <Logo href="https://www.facebook.com" className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </Logo>
      <Logo href="https://www.twitter.com" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </Logo>
      <Logo href="https://www.instagram.com" className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </Logo>
    </SocailContainer>
  );
}
