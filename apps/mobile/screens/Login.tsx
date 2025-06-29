import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { Button, Text, Input, Modal, Card } from "@ui-kitten/components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "../lib/supabase";

export const Login = () => {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Email login (magic link)
  const handleEmailLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      Alert.alert("Login Error", error.message);
    } else {
      Alert.alert(
        "Check your email",
        "A login link has been sent to your email address."
      );
      setEmailModalVisible(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    if (error) Alert.alert("Login Error", error.message);
  };

  // Apple login
  const handleAppleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
    });
    setLoading(false);
    if (error) Alert.alert("Login Error", error.message);
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/GzKcFqk.jpg" }}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.topContainer}>
        <Text style={styles.logoText}>Mingle</Text>
      </View>
      <View style={styles.container}>
        <Text category="h3" style={styles.title}>
          The AI Companion{"\n"}who cares
        </Text>
        <Text appearance="hint" style={styles.subtitle}>
          Create account or log in with options below
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.button}
            accessoryLeft={() => (
              <FontAwesome
                name="envelope"
                size={24}
                color="#fff"
                style={styles.icon}
              />
            )}
            onPress={() => setEmailModalVisible(true)}
            disabled={loading}
          >
            Continue with Email
          </Button>
          <Button
            style={styles.button}
            accessoryLeft={() => (
              <FontAwesome
                name="apple"
                size={24}
                color="#fff"
                style={styles.icon}
              />
            )}
            appearance="outline"
            onPress={handleAppleLogin}
            disabled={loading}
          >
            Continue with Apple
          </Button>
          <Button
            style={styles.button}
            accessoryLeft={() => (
              <FontAwesome
                name="google"
                size={24}
                color="#fff"
                style={styles.icon}
              />
            )}
            appearance="outline"
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://yourdomain.com/terms")}
          >
            Terms of service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://yourdomain.com/privacy")}
          >
            Privacy policy
          </Text>
        </Text>
      </View>
      {/* Email Modal */}
      <Modal
        visible={emailModalVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setEmailModalVisible(false)}
      >
        <Card disabled={true}>
          <Text category="h6" style={{ marginBottom: 8 }}>
            Enter your email
          </Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ marginBottom: 16 }}
          />
          <Button onPress={handleEmailLogin} disabled={loading}>
            Send Magic Link
          </Button>
        </Card>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  topContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(255,255,255,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 16,
  },
  button: {
    marginVertical: 8,
    borderRadius: 50,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  footer: {
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: "#B3D4FC",
  },
});
