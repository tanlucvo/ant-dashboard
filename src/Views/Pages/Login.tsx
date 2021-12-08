import { Card, Image, Spin } from "antd";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import Logo from "../../assets/antd.png";
export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      signInWithPopup(auth, provider);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  if (currentUser) {
    return <Redirect to="/admin/index" />;
  }

  return (
    <Card id="auth-card">
      <Image className="mb3 mt2" width={100} src={Logo} preview={false} />
      <GoogleLoginButton onClick={handleLogin}>
        <span style={{ marginRight: 15 }}>Login with Google</span>
        <Spin spinning={loading} />
      </GoogleLoginButton>
    </Card>
  );
}
