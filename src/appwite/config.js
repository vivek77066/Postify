import conf from '../conf/conf';
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client =new Client();
    databases;
    bucket;
    constructor(){
        this.client
                  .setEndpoint(conf.appwriteUrl)
                  .setProject(conf.appwriteProjectId);
                  this.databases = new Databases(this.client);
                  this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
             return await this.databases.createDocument(conf. appwriteDatabaseId,conf.appwriteCollectiontId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
             )
        }catch(error){
            console.log(" Appwrite service ::craetepost ::error ",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
          return await this.databases.updateDocument(
           conf.appwriteDatabaseId,conf.appwriteCollectiontId,slug,{
            title,content,featuredImage,status,

           }
          )
        }catch(error){
            console.log("Appwrite service ::updatepost::error",error);
        }

    }
    async deletePost(slug){
        try{
          await this.databases.deleteDocument(conf.appwriteDatabaseId,
            conf.appwriteCollectiontId,
                slug
            
          )
          return true;
        }catch(error){
            console.log("Appwrite Delete :: error ",error)
            return false;
        }

    }

    async getPost(slug){
        try{
          return await this.databases.getDocument(conf.appwriteDatabaseId,
            conf.appwriteCollectiontId,slug
          )
        }catch(error){
            console.log("Appwrite service ::getPost ::error",error)
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
  try{
     return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectiontId,
        queries
     )
  }catch(error){
console.log("Appwrite eror in getposts",error);
return false;
  }
    }

    //file service
    async uploadFile(file){
        try{
         return await this.bucket.createFile(
            conf.appwriteBucketId,ID.unique(),file
         )
        }catch(error){
            console.log("Appwrite uploadfile ::error",error)
            return false;
        }
    }

    async deleteFile(fileId){
        try{
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
        return true;
        }catch(error){
            console.log("Appwrite error in deletefile",error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,fileId
        )
    }
}

const service=new Service();


export default service;


