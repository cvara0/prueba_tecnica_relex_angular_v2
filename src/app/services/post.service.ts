import { Injectable } from '@angular/core';
import { Post } from '../models/post.models';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url       :string='https://jsonplaceholder.typicode.com/posts';
  postList  :Post[]=[];
  
  constructor(private http:HttpClient) {  }

  getPostList(): Observable<Object> {
    //this.postList=[];
    return this.http.get(this.url);
    
  }
  /*.subscribe((postList:any)=>{
    postList.map((auxPost:any)=>{
        let post={
          userId: auxPost.userId,
          id    : auxPost.id,
          title : auxPost.title,
          body  : auxPost.body
        }
        this.postList.push(post);
    })
  });*/
  //Editar post
  updatePost(post: Post){
    fetch(`${this.url}/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
        }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
  .then((response) => response.json())
  .then((json) => alert("Elemento 'editado' con éxito:"+"\nID: "+json['id']+"\nID Usuario: "+json['userId']+"\nTitulo: "+json['title']+"\nCuerpo: "+json['body']))
  .catch(response=>alert("Error de conexión, intente más tarde."));
  }

  // agregar post
  addPost(post: Post){
    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: post.userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => alert("Elemento 'agregado' con éxito:"+"\nID: "+json['id']+"\nID Usuario: "+json['userId']+"\nTitulo: "+json['title']+"\nCuerpo: "+json['body']))
    .catch(response=>alert("Error de conexión, intente más tarde."));
  }



  // Eliminar post por su ID
  deletePost(postId: string) {
    fetch(`${this.url}/${postId}`, {
      method: 'DELETE',
    }).then(response=>response.status===200?alert("Elemento 'eliminado', codigo de respuesta: "+response.status):alert("Error al eliminar elemento, codigo de respuesta: "+response.status))
      .catch(response=>alert("Error al 'eliminar' elemento, codigo de respuesta: "+response.status));
  }
}
