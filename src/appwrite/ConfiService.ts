import Config from 'react-native-config'
import { Client, ID, Databases, Storage, Query } from "appwrite";

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID: string = Config.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID: string = Config.APPWRITE_COLLECTION_ID!;

const appwriteClient = new Client()

export class Service {
    databases;

    constructor() {
        appwriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.databases = new Databases(appwriteClient);
    }


    async createUserMasterPassword(userId: string, masterPassword: string) {
        try {
          // Update a specific user document in your Appwrite database
          await this.databases.updateDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID, // Update this with your actual collection for user data
            userId,
            { masterPassword }
          );
          return true;
        } catch (error) {
          console.log("Appwrite service :: createUserMasterPassword :: error", error);
          return false;
        }
      }
    

      async getUserMasterPassword(userId: string) {
        try {
          // Fetch the user document from the database and get the master password
          const user = await this.databases.getDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID, // Update with your user collection name
            userId
          );
          return user?.masterPassword || null;
        } catch (error) {
          console.log("Appwrite service :: getUserMasterPassword :: error", error);
          return null;
        }
      }
}

const service = new Service()
export default service