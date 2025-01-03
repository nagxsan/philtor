import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
  platform: "com.sanchet.philtor",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');
    
    const authUrl = account.createOAuth2Token(OAuthProvider.Google, redirectUri);
    if (!authUrl) throw new Error('Failed to create oauth2 url');
    
    const browserSession = await openAuthSessionAsync(authUrl.toString(), redirectUri);
    if (browserSession.type !== 'success') throw new Error('Failed to open browser auth session');
    
    const url = new URL(browserSession.url);
    
    const userId = url.searchParams.get('userId')?.toString();
    const secret = url.searchParams.get('secret')?.toString();
    
    if(!userId || !secret) throw new Error('No userId or secret');
    
    const session = await account.createSession(userId, secret);
    if(!session) throw new Error('Failed to create session');
    
    return true;
    
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);
      
      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }
    
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
