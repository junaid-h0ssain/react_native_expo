import "@/global.css"
import { Link } from "expo-router";
import { Text } from "react-native";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);
 
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onBoarding" className="mt-4 px-4 py-2 bg-white  rounded">
        Go to OnBoarding
      </Link>
      <Link href="/(auth)/signIn" className="mt-4 px-4 py-2 bg-white  rounded">
        Go to Sign In
      </Link>
      <Link href="/(auth)/signUp" className="mt-4 px-4 py-2 bg-white  rounded">
        Go to Sign Up
      </Link>

      <Link href="/subscriptions/spotify" className="mt-4 px-4 py-2 bg-white  rounded">
        Go to Spotify Details
      </Link>

      <Link href={{ pathname: "/subscriptions/[id]", params: { id: "apple" } }} className="mt-4 px-4 py-2 bg-white  rounded">
        Go to Apple Details
      </Link>
    </SafeAreaView>
  );
}