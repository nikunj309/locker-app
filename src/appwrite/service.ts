import { ID, Client, Account, Databases } from 'appwrite'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'


const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID: string = Config.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID: string = Config.APPWRITE_COLLECTION_ID!;
const APPWRITE_COLLECTION_ID_PASSWORD_POST: string = Config.APPWRITE_COLLECTION_ID_PASSWORD_POST!;
const APPWRITE_COLLECTION_ID3: string = Config.APPWRITE_COLLECTION_ID3!;

type CreateUserAccount = {
  email: string;
  name: string;
  password: string;
}

type LoginUserAccount = {
  email: string;
  password: string;
}

class AppwriteService {
  account;
  databases;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
    this.account = new Account(appwriteClient)
    this.databases = new Databases(appwriteClient);
  }

  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )

      if (userAccount) {
        //login user here
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG
      })
      console.log("Appwrite Service :: createAccount() ::" + error);

    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailSession(
        email,
        password
      )
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG
      })
      console.log("Appwrite Service :: login() ::" + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      // Snackbar.show({
      //     text: String(error),
      //     duration: Snackbar.LENGTH_LONG
      // })
      console.log("Appwrite Service :: getCuurentUser() ::" + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current')
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG
      })
      console.log("Appwrite Service :: logout() ::" + error);
    }
  }


  async createUserMasterPassword(userId: string, masterPassword: string, slug: string) {
    try {


      await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID, // Update this with your actual collection for user data
        slug,
        { userId, masterPassword }
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
      if (user) {
        // const slug = user.slug; // Retrieve the slug from the user document
        return user.masterPassword;
      } else {
        console.log("User document or master password not found");
        return null; // Return null if the user or master password doesn't exist
      }
    } catch (error) {
      console.log("Appwrite service :: getUserMasterPassword :: error", error);
      return null;
    }
  }





  async addUserPassword(itemName: string, userName: string, password: string, website: string, slug: string) {
    try {


      await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PASSWORD_POST,
        ID.unique(),
        { itemName, userName, password, website, slug }
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: addUserPassword :: error", error);
      return false;
    }
  }
  async UpdateUserPasswordPost(itemId:string,itemName: string, userName: string, password: string, website: string) {
    try {


      await this.databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PASSWORD_POST,
        itemId,
        { itemName, userName, password, website }
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: addUserUpdatePasswordPost :: error", error);
      return false;
    }
  }


  async getUserPassword(slug: string) {
    try {
      // Fetch the user document from the database and get the master password
      const result = await this.databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PASSWORD_POST,

      )
      const userPasswords = result.documents.filter(
        (doc) => doc.slug === slug
      );
      return userPasswords;
    } catch (error) {
      console.log("Appwrite service :: getUserPassword :: error", error);
      return null;
    }
  }

  async deleteUserPasswordPost(slug: string) {
    try {
      await this.databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PASSWORD_POST,
        slug
      )
      return true
    } catch (error) {
      console.log("Appwrite servie :: deleteUserPasswordPost :: error", error);
      return false
    }
  }



  // Notes Routes

  async addUserNotesPost(itemName: string, title: string, noteDescription: string, userId:string) {
    try {


      await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID3,
        ID.unique(),
        { itemName, title, noteDescription,userId, postType:'notePost'}
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: addUserNotesPost :: error", error);
      return false;
    }
  }

  async getUserNotePost(userId: string) {
    try {
      // Fetch the user document from the database and get the master password
      const result = await this.databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID3,

      )
      const userNotePosts = result.documents.filter(
        (doc) => doc.userId === userId
      );
      return userNotePosts;
    } catch (error) {
      console.log("Appwrite service :: getUserNotesPost :: error", error);
      return null;
    }
  }

  async updateUserNotePost(itemId:string, itemName: string, title: string, noteDescription: string) {
    try {

      await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID3,
        itemId,
        { itemName, title, noteDescription}
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: updateUserNotePost :: error", error);
      return false;
    }
  }

  async deleteUserNotePost(noteId: string) {
    try {
      await this.databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID3,
        noteId
      )
      return true
    } catch (error) {
      console.log("Appwrite servie :: deleteUserNotePost :: error", error);
      return false
    }
  }


}


export default AppwriteService;