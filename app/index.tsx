import { Redirect } from 'expo-router';

/**
 * Entry route — for now always lands on welcome.
 * When auth / onboarding persistence exists (Stage 6), branch here.
 */
export default function Index() {
  return <Redirect href="/welcome" />;
}
