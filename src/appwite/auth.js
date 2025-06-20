import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }else{
                 return userAccount;
            }
           
        } catch (error) {
            console.error("Error creating account:", error);
            throw new Error("Failed to create account");
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Invalid email or password");
           
        }
    }

    

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Failed to get current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Logout failed:", error);
            throw new Error("Failed to log out");
        }
    }
}

const authService = new AuthService();
export default authService;


